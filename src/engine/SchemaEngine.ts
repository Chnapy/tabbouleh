import 'reflect-metadata';
import {
  JSONEntity,
  JSONEntityAny,
  JSONEntityObject,
  JSONEntityObjectProperties
} from '../types/JSONTypes';
import { REFLECT_KEY } from '../annotation/ReflectKeys';
import { ClassLike } from '../types/ClassTypes';
import PropertyEngine from './PropertyEngine';
import { JSONSchema7 } from 'json-schema';

export default class SchemaEngine {
  private static getJSONSchemaEntity(
    reflectEntity: JSONSchema7,
    paramEntity: Partial<JSONEntityObject>,
    name: string
  ): JSONSchema7 {
    return PropertyEngine.getJSONPropertyEntity<JSONEntityObject>(
      reflectEntity,
      paramEntity,
      Object
    );
  }

  static getReflectSchema(target: ClassLike): JSONSchema7 | undefined {
    return Reflect.getMetadata(REFLECT_KEY.JSON_SCHEMA, target.prototype);
  }

  private static setReflectSchema(target: ClassLike, entity: JSONSchema7): void {
    Reflect.defineMetadata(REFLECT_KEY.JSON_SCHEMA, entity, target.prototype);
  }

  static defineReflectSchema(target: ClassLike, value: Partial<JSONEntityObject>): void {
    const classSchema: JSONSchema7 =
      SchemaEngine.getReflectSchema(target) ||
      SchemaEngine.getJSONSchemaEntity({}, {}, target.name);

    Object.assign(classSchema, value);

    SchemaEngine.setReflectSchema(target, classSchema);
  }
}
