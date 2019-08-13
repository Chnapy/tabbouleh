import 'reflect-metadata';
import { JSONEntityObject, JSONRoot } from '../types/JSONTypes';
import AnnotationEngine from '../engine/AnnotationEngine';
import { ClassLike } from '../types/ClassTypes';

export function JSONSchema<T extends ClassLike>(target: T): void;
export function JSONSchema<T extends ClassLike>(
  value: Partial<JSONEntityObject | JSONRoot>
): Function;
export function JSONSchema<T extends ClassLike>(arg: any): Function | void {
  const compute = (value: Partial<JSONEntityObject | JSONRoot> = {}) => {
    return (target: T) => {
      AnnotationEngine.defineReflectSchema(target, value);
    };
  };

  if (typeof arg === 'object') {
    return compute(arg);
  } else {
    compute()(arg);
  }
}
