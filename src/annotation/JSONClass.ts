import 'reflect-metadata';
import { Optional } from '../jsonTypes/Optional';
import { JSONEntityObject } from '../jsonTypes/JSONTypes';
import AnnotationEngine from '../engine/AnnotationEngine';

export default function JSONClass<T extends { new(): object } & any>(value: Optional<JSONEntityObject> = {}) {

  return (target: T) => {

    // console.log('class', target);

    AnnotationEngine.defineReflectClassEntity(target, value);

    // console.log('class - metadata', Reflect.getMetadata(REFLECT_JSON_CLASS, target));

  };

}
