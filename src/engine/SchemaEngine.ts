import 'reflect-metadata';
import { JSONEntityObject } from '../types/JSONTypes';
import { REFLECT_KEY } from '../decorators/ReflectKeys';
import { ClassLike } from '../types/ClassTypes';
import PropertyEngine from './PropertyEngine';
import { JSONSchema7 } from 'json-schema';
import AssociationEngine from './AssociationEngine';
import { NotAJsonSchemaError } from '../exception/NotAJsonSchemaError';

export default class SchemaEngine {
  /**
   * Return a full JSON Schema from a class, with all properties.
   * Compute all the class associations.
   *
   * @param target
   * @param sourceStack
   */
  static getComputedJSONSchema(target: ClassLike, sourceStack?: ClassLike[]): JSONSchema7 {
    AssociationEngine.computeJSONAssociations(target, sourceStack);

    const schema = SchemaEngine.getReflectSchema(target);

    if (!schema) {
      throw new NotAJsonSchemaError(target);
    }

    schema.properties = PropertyEngine.getReflectProperties(target.prototype);

    return schema;
  }

  static defineReflectSchema(target: ClassLike, value: Partial<JSONEntityObject>): void {
    const classSchema: JSONSchema7 =
      SchemaEngine.getReflectSchema(target) ||
      SchemaEngine.getJSONSchemaEntity({}, {}, target.name);

    Object.assign(classSchema, value);

    SchemaEngine.setReflectSchema(target, classSchema);
  }

  static getReflectSchema(target: ClassLike): JSONSchema7 | undefined {
    return Reflect.getMetadata(REFLECT_KEY.JSON_SCHEMA, target.prototype);
  }

  private static getJSONSchemaEntity(
    reflectEntity: JSONSchema7,
    paramEntity: JSONSchema7,
    name: string
  ): JSONSchema7 {
    return PropertyEngine.getJSONPropertySchema<JSONEntityObject>(
      reflectEntity,
      paramEntity,
      Object
    );
  }

  private static setReflectSchema(target: ClassLike, entity: JSONSchema7): void {
    Reflect.defineMetadata(REFLECT_KEY.JSON_SCHEMA, entity, target.prototype);
  }
}
