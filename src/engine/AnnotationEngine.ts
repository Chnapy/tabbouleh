import 'reflect-metadata';
import { JSONEntity, JSONEntityAny, JSONEntityObject, JSONEntityObjectProperties } from '../types/JSONTypes';
import { Optional } from '../types/UtilTypes';
import { REFLECT_KEY } from '../annotation/ReflectKeys';
import { ClassLike } from '../types/ClassTypes';

export default class AnnotationEngine {
  private static getJSONType(typeTS: ClassLike): JSONEntityAny {
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
          type: 'any'
        };
    }
  }

  private static getJSONPropertyEntity<J extends JSONEntity<any, any>>(
    reflectEntity: Optional<J>,
    paramEntity: Optional<J>,
    typeTS: ClassLike
  ): J {

    const typeEntity = AnnotationEngine.getJSONType(typeTS) as J;

    return {
      ...typeEntity,
      ...reflectEntity,
      ...paramEntity
    };
  }

  private static getJSONSchemaEntity(
    reflectEntity: Optional<JSONEntityObject>,
    paramEntity: Optional<JSONEntityObject>,
    name: string
  ): JSONEntityObject {
    return AnnotationEngine.getJSONPropertyEntity<JSONEntityObject>(
      reflectEntity,
      paramEntity,
      Object
    );
  }

  static getReflectSchema(target: ClassLike): JSONEntityObject | undefined {
    return Reflect.getMetadata(REFLECT_KEY.JSON_SCHEMA, target.prototype);
  }

  private static setReflectSchema(target: ClassLike, entity: JSONEntityAny): void {
    Reflect.defineMetadata(REFLECT_KEY.JSON_SCHEMA, entity, target.prototype);
  }

  static getReflectProperties(prototype: ClassLike['prototype']): JSONEntityObjectProperties {
    return Reflect.getMetadata(REFLECT_KEY.JSON_PROPERTY, prototype) || {};
  }

  private static setReflectProperties(
    prototype: ClassLike['prototype'],
    properties: JSONEntityObject['properties']
  ): void {
    Reflect.defineMetadata(REFLECT_KEY.JSON_PROPERTY, properties, prototype);
  }

  static defineReflectSchema(target: ClassLike, value: Optional<JSONEntityObject>): void {
    const classSchema: JSONEntityObject =
      AnnotationEngine.getReflectSchema(target) ||
      AnnotationEngine.getJSONSchemaEntity({}, {}, target.name);

    Object.assign(classSchema, value);

    AnnotationEngine.setReflectSchema(target, classSchema);
  }

  static defineReflectProperties<C extends ClassLike>(
    prototype: C['prototype'],
    key: keyof C['prototype'] & string,
    value: Optional<JSONEntityAny>
  ): void {
    const properties = AnnotationEngine.getReflectProperties(prototype);

    const reflectSchema: Optional<JSONEntityAny> =
      Reflect.getMetadata(REFLECT_KEY.JSON_SCHEMA, prototype, key) || {};

    const typeSchema: ClassLike = Reflect.getMetadata(REFLECT_KEY.TYPE, prototype, key);

    const fullSchema: JSONEntityAny = AnnotationEngine.getJSONPropertyEntity<JSONEntityAny>(
      reflectSchema,
      value,
      typeSchema
    );

    properties[key] = {
      ...(properties[key] || {}),
      ...fullSchema
    };

    AnnotationEngine.setReflectProperties(prototype, properties);
  }

  static defineReflectProperty<C extends ClassLike, J extends JSONEntity<any, any>, K extends keyof J>(
    prototype: C['prototype'],
    key: keyof C['prototype'] & string,
    propertyKey: K,
    propertyValue: J[K]
  ): void {

    const properties = AnnotationEngine.getReflectProperties(prototype);

    const reflectSchema: Optional<JSONEntityAny> =
      Reflect.getMetadata(REFLECT_KEY.JSON_SCHEMA, prototype, key) || {};

    const typeSchema: ClassLike = Reflect.getMetadata(REFLECT_KEY.TYPE, prototype, key);

    const fullSchema: JSONEntityAny = AnnotationEngine.getJSONPropertyEntity<JSONEntityAny>(
      reflectSchema,
      {
        [propertyKey]: propertyValue
      },
      typeSchema
    );

    delete fullSchema.type;

    properties[key] = {
      ...(properties[key] || {}),
      ...fullSchema
    };

    AnnotationEngine.setReflectProperties(prototype, properties);
  }

}
