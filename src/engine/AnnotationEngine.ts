import 'reflect-metadata';
import { JSONEntity, JSONEntityAny, JSONEntityObject, JSONEntityObjectProperties } from '../jsonTypes/JSONTypes';
import { Optional } from '../jsonTypes/Optional';
import { REFLECT_JSON_ATTRIBUTES, REFLECT_JSON_CLASS, REFLECT_TYPE } from '../annotation/ReflectKeys';


export default class AnnotationEngine {

  private static getJSONType(typeTS: string): JSONEntityAny {

    switch (typeTS) {
      case 'Object':
        return {
          type: 'object'
        };
      case 'Number':
        return {
          type: 'number'
        };
      case 'String':
        return {
          type: 'string'
        };
      default:
        console.error('TS type not handled ' + typeTS);
        return {
          type: 'any'
        };
    }

  }

  private static getJSONAttributeEntity<J extends JSONEntity<any, any>>(reflectEntity: Optional<J>, paramEntity: Optional<J>, typeTS: string, name: string): J {

    reflectEntity = reflectEntity || {};
    paramEntity = paramEntity || {};

    const typeEntity = AnnotationEngine.getJSONType(typeTS) as J;

    const fullEntity: J = {
      ...typeEntity,
      ...reflectEntity,
      ...paramEntity
    };

    return fullEntity;
  }

  private static getJSONClassEntity(reflectEntity: Optional<JSONEntityObject>, paramEntity: Optional<JSONEntityObject>, name: string): JSONEntityObject {

    return AnnotationEngine.getJSONAttributeEntity<JSONEntityObject>(reflectEntity, paramEntity, 'Object', name);

  }

  private static getReflectClassEntity(target: any): JSONEntityObject {

    return Reflect.getMetadata(REFLECT_JSON_CLASS, target.prototype)
      || AnnotationEngine.getJSONClassEntity({}, {}, target.name);

  }

  private static setReflectClassEntity(target: any, entity: JSONEntityAny): void {

    Reflect.defineMetadata(REFLECT_JSON_CLASS, entity, target.prototype);

  }

  private static getReflectAttributesObject(prototype: any): JSONEntityObjectProperties {

    return Reflect.getMetadata(REFLECT_JSON_ATTRIBUTES, prototype) || {};

  }

  private static setReflectAttributesObject(prototype: any, attributes: JSONEntityObject['properties']): void {

    Reflect.defineMetadata(REFLECT_JSON_ATTRIBUTES, attributes, prototype);

  }

  static defineReflectClassEntity(target: any, value: Optional<JSONEntityObject>): void {

    const classEntity = AnnotationEngine.getReflectClassEntity(target);

    Object.assign(classEntity, value);

    AnnotationEngine.setReflectClassEntity(target, classEntity);

  }

  static defineReflectAttributeEntity(prototype: any, key: string, value: Optional<JSONEntityAny>): void {

    const properties = AnnotationEngine.getReflectAttributesObject(prototype);

    // const properties = attributesObject.properties || {};

    const reflectEntity: Optional<JSONEntityAny> = Reflect.getMetadata(REFLECT_JSON_CLASS, prototype, key) || {};

    const typeEntity: Function = Reflect.getMetadata(REFLECT_TYPE, prototype, key);

    const fullEntity: JSONEntityAny = AnnotationEngine.getJSONAttributeEntity<JSONEntityAny>(reflectEntity, value, typeEntity.name, key);

    properties[key] = {
      ...(properties[key] || {}),
      ...fullEntity
    };

    // attributesObject.properties = properties;

    AnnotationEngine.setReflectAttributesObject(prototype, properties);

  }

}
