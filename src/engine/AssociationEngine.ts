import {ClassLike} from '../types/ClassTypes';
import {JSONSchema7} from 'json-schema';
import {REFLECT_KEY} from '../decorators/ReflectKeys';
import {Association, AssociationMap, ClassFn} from '../types/AssociationTypes';
import PropertyEngine from './PropertyEngine';
import SchemaEngine from './SchemaEngine';
import {NotAJsonSchemaError} from '../exception/NotAJsonSchemaError';
import {Util} from './Util';

/**
 * Handle all associations concerns
 */
export default class AssociationEngine {
  /**
   * Apply all associations with target as source class.
   *
   * @param target class source
   * @param definitions schema definitions of the root schema
   * @param sourceStack stack of all class covered, in case of CircularDependencyError
   */
  static computeJSONAssociations(target: ClassLike, definitions?: JSONSchema7['definitions'], sourceStack: ClassLike[] = []): void {
    sourceStack.push(target);

    const rootTarget = sourceStack[0];

    const isRoot = sourceStack.length === 1;

    if(!definitions) {
      const rootTargetSchema = SchemaEngine.getReflectSchema(rootTarget) || {};

      definitions = rootTargetSchema.definitions || {};
    }

    const assocMapClass = AssociationEngine.getAssociations(target.name, target.prototype);

    assocMapClass.forEach(a => {
      const assocTarget: ClassLike = a.targetFn();

      if (!Util.isClass(assocTarget)) {
        throw new NotAJsonSchemaError(assocTarget);
      }

      if (assocTarget !== rootTarget) {
        const targetID = AssociationEngine.generateSchemaID(assocTarget);

        if (!definitions![targetID]) {
          definitions![targetID] = SchemaEngine.getComputedJSONSchema(assocTarget, definitions, sourceStack);
        }
      }

      const refSchema: JSONSchema7 = {
        $ref: AssociationEngine.generateRef(assocTarget, rootTarget)
      };

      const value = a.jsonPropertyKey
        ? {
          [a.jsonPropertyKey]: refSchema
          }
        : refSchema;

      PropertyEngine.defineReflectProperties(target.prototype, a.key, value);
    });

    if (Object.keys(definitions).length && isRoot) {
      SchemaEngine.defineReflectSchema(rootTarget, {
        definitions
      });
    }
  }

  /**
   * Create and add an association to the given C class,
   * which target the class returned by classTargetFn.
   *
   * @param prototypeSource prototype of the C class source
   * @param propertyKey property concerned of the C class source
   * @param jsonProperty JSON property key concerned. Or null if concerns all the JSON Schema
   * @param classTargetFn wrapper of the class targeted
   */
  static addAssociation<C extends ClassLike>(
    prototypeSource: C['prototype'],
    propertyKey: keyof C['prototype'] & string,
    jsonProperty: keyof JSONSchema7 | null,
    classTargetFn: ClassFn
  ): void {
    const className = prototypeSource.constructor.name;

    const association: Association = {
      className,
      key: propertyKey,
      jsonPropertyKey: jsonProperty,
      targetFn: classTargetFn
    };

    const associationMap = AssociationEngine.getReflectAssociation(prototypeSource) || {};

    let assocMapClass = associationMap[className] || [];

    // if an association for this key and json key already exist, remove it
    assocMapClass = assocMapClass.filter(
      a => a.key !== association.key || a.jsonPropertyKey !== association.jsonPropertyKey
    );

    associationMap[className] = assocMapClass;

    assocMapClass.push(association);

    AssociationEngine.setReflectAssociation(prototypeSource, associationMap);
  }

  /**
   * For the given class return all its associations.
   *
   * @param className
   * @param prototypeSource prototype of the class
   */
  static getAssociations<C extends ClassLike>(
    className: C['name'],
    prototypeSource: C['prototype']
  ): Association[] {
    const associationMap = AssociationEngine.getReflectAssociation(prototypeSource) || {};

    return associationMap[className] || [];
  }

  /**
   * Generate a '$ref' value for the given target class.
   *
   * @param target
   * @param rootTarget
   */
  static generateRef(target: ClassLike, rootTarget?: ClassLike): string {
    if (target === rootTarget) {
      return '#';
    }
    return `#/definitions/${AssociationEngine.generateSchemaID(target)}`;
  }

  /**
   * Generate an ID for the given target class.
   *
   * @param target
   */
  static generateSchemaID(target: ClassLike): string {
    return `_${target.name}_`;
  }

  /**
   * Return the association map of the given class prototype.
   *
   * @param prototypeTarget prototype of the class
   */
  private static getReflectAssociation(
    prototypeTarget: ClassLike['prototype']
  ): AssociationMap | undefined {
    return Reflect.getMetadata(REFLECT_KEY.JSON_ASSOCIATIONS, prototypeTarget);
  }

  /**
   * Define the association map of the given class prototype.
   *
   * @param prototypeTarget prototype of the class
   * @param associationMap
   */
  private static setReflectAssociation(
    prototypeTarget: ClassLike['prototype'],
    associationMap: AssociationMap
  ): void {
    Reflect.defineMetadata(REFLECT_KEY.JSON_ASSOCIATIONS, associationMap, prototypeTarget);
  }
}
