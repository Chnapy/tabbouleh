import 'reflect-metadata';
import { JSONEntityObject, JSONRoot } from '../types/JSONTypes';
import AnnotationEngine from '../engine/AnnotationEngine';
import { ClassLike } from '../types/ClassTypes';

export function JSONSchema<T extends object>(target: T): void;
export function JSONSchema<T extends object>(
  value: Partial<JSONEntityObject<T> | JSONRoot<T>>
): Function;
export function JSONSchema<T extends object>(arg: any): Function | void {
  const compute = (value: Partial<JSONEntityObject<T> | JSONRoot<T>> = {}) => {
    return (target: T) => {
      AnnotationEngine.defineReflectSchema(target as ClassLike, value);
    };
  };

  if (typeof arg === 'object') {
    return compute(arg);
  } else {
    compute()(arg);
  }
}
