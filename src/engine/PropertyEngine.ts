import 'reflect-metadata';
import { JSONEntity, JSONEntityAny } from '../types/JSONTypes';
import { REFLECT_KEY } from '../decorators/ReflectKeys';
import { ClassLike } from '../types/ClassTypes';
import { JSONSchema7 } from 'json-schema';

/**
 * Handle all JSONProperty concerns.
 */
export default class PropertyEngine {
  /**
   * From a class, return a JSONSchema which may contain only the 'type' associated to this class.
   *
   * @param typeTS
   */
  private static getJSONSchemaType(typeTS: ClassLike): JSONSchema7 {
    switch (typeTS) {
      case Array:
        return {
          type: 'array'
        };
      case Number:
        return {
          type: 'number'
        };
      case String:
        return {
          type: 'string'
        };
      case Object:
        return {
          type: 'object'
        };
      default:
        return {
          type: 'null'
        };
    }
  }

  /**
   * Return a JSON Schema for a property.
   *
   * @param reflectEntity partial schema get by reflection
   * @param paramEntity partial schema given in param
   * @param typeTS reflected type of the property
   */
  static getJSONPropertySchema<J extends JSONEntity<any, any>>(
    reflectEntity: JSONSchema7,
    paramEntity: JSONSchema7,
    typeTS: ClassLike
  ): JSONSchema7 {
    const typeEntity = PropertyEngine.getJSONSchemaType(typeTS) as J;

    return {
      ...typeEntity,
      ...reflectEntity,
      ...paramEntity
    };
  }

  /**
   * Return by reflection JSON properties (aka JSONSchema.properties) of the JSONSchema.
   *
   * @param prototype prototype of the JSONSchema class
   */
  static getReflectProperties(
    prototype: ClassLike['prototype']
  ): object & Exclude<JSONSchema7['properties'], undefined> {
    return Reflect.getMetadata(REFLECT_KEY.JSON_PROPERTY, prototype) || {};
  }

  /**
   * Define by reflection JSON properties (aka JSONSchema.properties) of the JSONSchema.
   *
   * @param prototype prototype of the JSONSchema class
   * @param properties JSONSchema.properties of the JSONSchema
   */
  private static setReflectProperties(
    prototype: ClassLike['prototype'],
    properties: JSONSchema7['properties']
  ): void {
    Reflect.defineMetadata(REFLECT_KEY.JSON_PROPERTY, properties, prototype);
  }

  /**
   * Define JSON schema of the given property.
   *
   * @param prototype prototype of the JSONSchema class
   * @param key property key of the JSONSchema class
   * @param value partial schema given in param
   */
  static defineReflectProperties<C extends ClassLike>(
    prototype: C['prototype'],
    key: keyof C['prototype'] & string,
    value: JSONSchema7
  ): void {
    // get existing properties
    const properties = PropertyEngine.getReflectProperties(prototype);

    // get the json schema of the property
    const reflectSchema: JSONSchema7 =
      Reflect.getMetadata(REFLECT_KEY.JSON_CLASS, prototype, key) || {};

    // get the infered type of the property
    const typeSchema: ClassLike = Reflect.getMetadata(REFLECT_KEY.TYPE, prototype, key);

    // construct the final schema
    const fullSchema: JSONSchema7 = PropertyEngine.getJSONPropertySchema<JSONEntityAny>(
      reflectSchema,
      value,
      typeSchema
    );

    // add the schema to existing properties
    properties[key as string] = {
      ...(properties[key] || {}),
      ...fullSchema
    };

    PropertyEngine.setReflectProperties(prototype, properties);
  }
}
