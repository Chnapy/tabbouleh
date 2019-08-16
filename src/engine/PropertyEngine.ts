import 'reflect-metadata';
import { JSONEntity, JSONEntityAny } from '../types/JSONTypes';
import { REFLECT_KEY } from '../decorators/ReflectKeys';
import { ClassLike } from '../types/ClassTypes';
import { JSONSchema7 } from 'json-schema';

export default class PropertyEngine {
  private static getJSONType(typeTS: ClassLike): JSONSchema7 {
    switch (typeTS) {
      case Object:
        return {
          type: 'object'
        };
      case Number:
        return {
          type: 'number'
        };
      case String:
        return {
          type: 'string'
        };
      default:
        return {
          type: 'null'
        };
    }
  }

  static getJSONPropertyEntity<J extends JSONEntity<any, any>>(
    reflectEntity: JSONSchema7,
    paramEntity: JSONSchema7,
    typeTS: ClassLike
  ): JSONSchema7 {
    const typeEntity = PropertyEngine.getJSONType(typeTS) as J;

    return {
      ...typeEntity,
      ...reflectEntity,
      ...paramEntity
    };
  }

  static getReflectProperties(
    prototype: ClassLike['prototype']
  ): object & Exclude<JSONSchema7['properties'], undefined> {
    return Reflect.getMetadata(REFLECT_KEY.JSON_PROPERTY, prototype) || {};
  }

  private static setReflectProperties(
    prototype: ClassLike['prototype'],
    properties: JSONSchema7['properties']
  ): void {
    Reflect.defineMetadata(REFLECT_KEY.JSON_PROPERTY, properties, prototype);
  }

  static defineReflectProperties<C extends ClassLike>(
    prototype: C['prototype'],
    key: keyof C['prototype'] & string,
    value: JSONSchema7
  ): void {
    const properties = PropertyEngine.getReflectProperties(prototype);

    const reflectSchema: JSONSchema7 =
      Reflect.getMetadata(REFLECT_KEY.JSON_SCHEMA, prototype, key) || {};

    const typeSchema: ClassLike = Reflect.getMetadata(REFLECT_KEY.TYPE, prototype, key);

    const fullSchema: JSONSchema7 = PropertyEngine.getJSONPropertyEntity<JSONEntityAny>(
      reflectSchema,
      value,
      typeSchema
    );

    properties[key as string] = {
      ...(properties[key] || {}),
      ...fullSchema
    };

    PropertyEngine.setReflectProperties(prototype, properties);
  }
}
