import 'reflect-metadata';
import { JSONEntityObject, JSONRoot } from '../types/JSONTypes';
import AnnotationEngine from '../engine/AnnotationEngine';
import { ClassLike } from '../types/ClassTypes';

type JSONSchemaValue<T extends object> = Partial<JSONEntityObject<T> | JSONRoot<T>>;

const compute = <T extends object>(value: JSONSchemaValue<T> = {}) => {
  return (target: T): void => {
    AnnotationEngine.defineReflectSchema(target as ClassLike, value);
  };
};

/**
 * Annotation for JSON entities.
 * Use it on class.
 */
export function JSONSchema<T extends object>(target: T): void;
export function JSONSchema<T extends object>(value: JSONSchemaValue<T>): Function;
export function JSONSchema<T extends object>(arg: T | JSONSchemaValue<T>): Function | void {
  if (typeof arg === 'object') {
    return compute(arg);
  } else {
    compute()(arg);
  }
}
