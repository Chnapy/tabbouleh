import { Optional } from '../jsonTypes/Optional';
import { JSONEntity } from '../jsonTypes/JSONTypes';
import AnnotationEngine from '../engine/AnnotationEngine';

export default function JSONAttribute<J extends JSONEntity<any, any>>(value: Optional<J> = {}) {

  // console.log('key - attribute', value);

  return <T extends { new(): object } & any>(prototype: T, key: keyof T & any, descriptor?: PropertyDescriptor): void => {

    AnnotationEngine.defineReflectAttributeEntity(prototype, key, value);

    // console.log('key - attribute - metadata', key, Reflect.getMetadata(REFLECT_JSON_ATTRIBUTES, prototype), prototype);
  };

}

