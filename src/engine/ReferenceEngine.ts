import { Class } from '../types/ClassTypes';
import { JSONSchema7 } from 'json-schema';
import { REFLECT_KEY } from '../decorators/ReflectKeys';
import { Reference, ReferenceMap, ClassResolver } from '../types/ReferenceTypes';
import PropertyEngine from './PropertyEngine';
import SchemaEngine from './SchemaEngine';
import { NotAJsonSchemaError } from '../exception/NotAJsonSchemaError';
import { Util } from './Util';

/**
 * Handle all references concerns
 */
export default class ReferenceEngine {
  /**
   * Apply all references with target as source class.
   *
   * @param target class source
   * @param definitions schema definitions of the root schema
   * @param rootTarget root schema class, if not target
   */
  static computeJSONReferences(
    target: Class,
    definitions?: JSONSchema7['definitions'],
    rootTarget?: Class
  ): void {
    const isRoot = !rootTarget;

    rootTarget = rootTarget || target;

    if (!definitions) {
      const rootTargetSchema = SchemaEngine.getReflectSchema(rootTarget) || {};

      definitions = rootTargetSchema.definitions || {};
    }

    const refMapClass = ReferenceEngine.getReferences(target.name, target.prototype);

    refMapClass.forEach((a) => {
      const refTarget: Class = a.targetFn();

      if (!Util.isClass(refTarget)) {
        throw new NotAJsonSchemaError(refTarget);
      }

      if (refTarget !== rootTarget) {
        const targetID = ReferenceEngine.generateSchemaID(refTarget);

        if (!definitions![targetID]) {
          definitions![targetID] = SchemaEngine.getComputedJSONSchema(
            refTarget,
            definitions,
            rootTarget
          );
        }
      }

      const refSchema: JSONSchema7 = {
        $ref: ReferenceEngine.generateRef(refTarget, rootTarget),
      };

      const value = a.jsonPropertyKey
        ? {
            [a.jsonPropertyKey]: refSchema,
          }
        : refSchema;

      PropertyEngine.defineReflectProperties(target.prototype, a.key, value);
    });

    if (Object.keys(definitions).length && isRoot) {
      SchemaEngine.defineReflectSchema(rootTarget, {
        definitions,
      });
    }
  }

  /**
   * Create and add a reference to the given C class,
   * which target the class returned by classTargetFn.
   *
   * @param prototypeSource prototype of the C class source
   * @param propertyKey property concerned of the C class source
   * @param jsonProperty JSON property key concerned. Or null if concerns all the JSON Schema
   * @param classTargetFn resolver of the class targeted
   */
  static addReference<C extends Class>(
    prototypeSource: C['prototype'],
    propertyKey: keyof C['prototype'] & string,
    jsonProperty: keyof JSONSchema7 | null,
    classTargetFn: ClassResolver
  ): void {
    const className = prototypeSource.constructor.name;

    const reference: Reference = {
      className,
      key: propertyKey,
      jsonPropertyKey: jsonProperty,
      targetFn: classTargetFn,
    };

    const referenceMap = ReferenceEngine.getReflectReference(prototypeSource) || {};

    let refMapClass = referenceMap[className] || [];

    // if a reference for this key and json key already exist, remove it
    refMapClass = refMapClass.filter(
      (a) => a.key !== reference.key || a.jsonPropertyKey !== reference.jsonPropertyKey
    );

    referenceMap[className] = refMapClass;

    refMapClass.push(reference);

    ReferenceEngine.setReflectReference(prototypeSource, referenceMap);
  }

  /**
   * For the given class return all its references.
   *
   * @param className
   * @param prototypeSource prototype of the class
   */
  static getReferences<C extends Class>(
    className: C['name'],
    prototypeSource: C['prototype']
  ): Reference[] {
    const referenceMap = ReferenceEngine.getReflectReference(prototypeSource) || {};

    return referenceMap[className] || [];
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
    return `#/definitions/${ReferenceEngine.generateSchemaID(target)}`;
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
   * Return the reference map of the given class prototype.
   *
   * @param prototypeTarget prototype of the class
   */
  private static getReflectReference(
    prototypeTarget: Class['prototype']
  ): ReferenceMap | undefined {
    return Reflect.getMetadata(REFLECT_KEY.JSON_REFERENCE, prototypeTarget);
  }

  /**
   * Define the reference map of the given class prototype.
   *
   * @param prototypeTarget prototype of the class
   * @param referenceMap
   */
  private static setReflectReference(
    prototypeTarget: Class['prototype'],
    referenceMap: ReferenceMap
  ): void {
    Reflect.defineMetadata(REFLECT_KEY.JSON_REFERENCE, referenceMap, prototypeTarget);
  }
}
