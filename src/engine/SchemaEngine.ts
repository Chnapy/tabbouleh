import 'reflect-metadata';
import { JSONEntityObject } from '../types/JSONTypes';
import { REFLECT_KEY } from '../decorators/ReflectKeys';
import { Class } from '../types/ClassTypes';
import PropertyEngine from './PropertyEngine';
import { JSONSchema7 } from 'json-schema';
import ReferenceEngine from './ReferenceEngine';
import { NotAJsonSchemaError } from '../exception/NotAJsonSchemaError';

/**
 * Handle all JSONSchema class concerns.
 */
export default class SchemaEngine {
  /**
   * Return a full JSON Schema from a class, with all properties.
   * Compute all the class references.
   *
   * @param target JSONSchema class
   * @param definitions schema definitions of the root schema
   * @param rootTarget root schema class, if not target
   */
  static getComputedJSONSchema(
    target: Class,
    definitions?: JSONSchema7['definitions'],
    rootTarget?: Class
  ): JSONSchema7 {
    ReferenceEngine.computeJSONReferences(target, definitions, rootTarget);

    const schema = SchemaEngine.getReflectSchema(target);

    if (!schema) {
      throw new NotAJsonSchemaError(target);
    }

    schema.properties = PropertyEngine.getReflectProperties(target.prototype);

    return schema;
  }

  /**
   * Define by reflection the JSON schema of the given class.
   *
   * @param target JSONSchema class
   * @param value partial schema given in param
   */
  static defineReflectSchema(target: Class, value: Partial<JSONEntityObject>): void {
    const classSchema: JSONSchema7 =
      // we get the existing schema of the class
      SchemaEngine.getReflectSchema(target) ||
      // or we create an empty one (object)
      PropertyEngine.getJSONPropertySchema<JSONEntityObject>({}, {}, Object);

    Object.assign(classSchema, value);

    SchemaEngine.setReflectSchema(target, classSchema);
  }

  /**
   * Return a JSON schema if exist for the given class.
   *
   * @param target JSONSchema class
   */
  static getReflectSchema(target: Class): JSONSchema7 | undefined {
    return Reflect.getMetadata(REFLECT_KEY.JSON_SCHEMA, target.prototype);
  }

  /**
   * Define a JSON schema if exist for the given class.
   *
   * @param target JSONSchema class
   * @param schema JSON schema
   */
  private static setReflectSchema(target: Class, schema: JSONSchema7): void {
    Reflect.defineMetadata(REFLECT_KEY.JSON_SCHEMA, schema, target.prototype);
  }
}
