import 'reflect-metadata';
import {
  JSONEntity,
  JSONEntityAny,
  JSONEntityObject,
  JSONEntityObjectProperties
} from '../types/JSONTypes';
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

  private static getJSONAttributeEntity<J extends JSONEntity<any, any>>(
    reflectEntity: Optional<J>,
    paramEntity: Optional<J>,
    typeTS: ClassLike,
    name: string
  ): J {
    reflectEntity = reflectEntity || {};
    paramEntity = paramEntity || {};

    const typeEntity = AnnotationEngine.getJSONType(typeTS) as J;

    return {
      ...typeEntity,
      ...reflectEntity,
      ...paramEntity
    };
  }

  private static getJSONClassEntity(
    reflectEntity: Optional<JSONEntityObject>,
    paramEntity: Optional<JSONEntityObject>,
    name: string
  ): JSONEntityObject {
    return AnnotationEngine.getJSONAttributeEntity<JSONEntityObject>(
      reflectEntity,
      paramEntity,
      Object,
      name
    );
  }

  static getReflectClassEntity(target: ClassLike): JSONEntityObject | undefined {
    return Reflect.getMetadata(REFLECT_KEY.JSON_CLASS, target.prototype);
  }

  private static setReflectClassEntity(target: ClassLike, entity: JSONEntityAny): void {
    Reflect.defineMetadata(REFLECT_KEY.JSON_CLASS, entity, target.prototype);
  }

  static getReflectAttributesObject(prototype: ClassLike['prototype']): JSONEntityObjectProperties {
    return Reflect.getMetadata(REFLECT_KEY.JSON_ATTRIBUTES, prototype) || {};
  }

  private static setReflectAttributesObject(
    prototype: ClassLike['prototype'],
    attributes: JSONEntityObject['properties']
  ): void {
    Reflect.defineMetadata(REFLECT_KEY.JSON_ATTRIBUTES, attributes, prototype);
  }

  static defineReflectClassEntity(target: ClassLike, value: Optional<JSONEntityObject>): void {
    const classEntity: JSONEntityObject =
      AnnotationEngine.getReflectClassEntity(target) ||
      AnnotationEngine.getJSONClassEntity({}, {}, target.name);

    Object.assign(classEntity, value);

    AnnotationEngine.setReflectClassEntity(target, classEntity);
  }

  static defineReflectAttributeEntity<C extends ClassLike>(
    prototype: C['prototype'],
    key: keyof C['prototype'] & string,
    value: Optional<JSONEntityAny>
  ): void {
    const properties = AnnotationEngine.getReflectAttributesObject(prototype);

    const reflectEntity: Optional<JSONEntityAny> =
      Reflect.getMetadata(REFLECT_KEY.JSON_CLASS, prototype, key) || {};

    const typeEntity: ClassLike = Reflect.getMetadata(REFLECT_KEY.TYPE, prototype, key);

    const fullEntity: JSONEntityAny = AnnotationEngine.getJSONAttributeEntity<JSONEntityAny>(
      reflectEntity,
      value,
      typeEntity,
      key
    );

    properties[key] = {
      ...(properties[key] || {}),
      ...fullEntity
    };

    AnnotationEngine.setReflectAttributesObject(prototype, properties);
  }
}
