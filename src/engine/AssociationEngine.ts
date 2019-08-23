import {Class} from '../types/ClassTypes';
import {JSONSchema7} from 'json-schema';
import {REFLECT_KEY} from '../decorators/ReflectKeys';
import {Association, AssociationMap, ClassResolver} from '../types/AssociationTypes';
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
   * @param rootTarget root schema class, if not target
   */
  static computeJSONAssociations(target: Class, definitions?: JSONSchema7['definitions'], rootTarget?: Class): void {

    const isRoot = !rootTarget;

    rootTarget = rootTarget || target;

    if(!definitions) {
      const rootTargetSchema = SchemaEngine.getReflectSchema(rootTarget) || {};

      definitions = rootTargetSchema.definitions || {};
    }

    const assocMapClass = AssociationEngine.getAssociations(target.name, target.prototype);

    assocMapClass.forEach(a => {
      const assocTarget: Class = a.targetFn();

      if (!Util.isClass(assocTarget)) {
        throw new NotAJsonSchemaError(assocTarget);
      }

      if (assocTarget !== rootTarget) {
        const targetID = AssociationEngine.generateSchemaID(assocTarget);

        if (!definitions![targetID]) {
          definitions![targetID] = SchemaEngine.getComputedJSONSchema(assocTarget, definitions, rootTarget);
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
   * @param classTargetFn resolver of the class targeted
   */
  static addAssociation<C extends Class>(
    prototypeSource: C['prototype'],
    propertyKey: keyof C['prototype'] & string,
    jsonProperty: keyof JSONSchema7 | null,
    classTargetFn: ClassResolver
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
  static getAssociations<C extends Class>(
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
  static generateRef(target: Class, rootTarget?: Class): string {
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
  static generateSchemaID(target: Class): string {
    return `_${target.name}_`;
  }

  /**
   * Return the association map of the given class prototype.
   *
   * @param prototypeTarget prototype of the class
   */
  private static getReflectAssociation(
    prototypeTarget: Class['prototype']
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
    prototypeTarget: Class['prototype'],
    associationMap: AssociationMap
  ): void {
    Reflect.defineMetadata(REFLECT_KEY.JSON_ASSOCIATIONS, associationMap, prototypeTarget);
  }
}
