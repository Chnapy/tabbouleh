import 'reflect-metadata';
import { Optional } from '../types/UtilTypes';
import { JSONEntityObject, JSONRoot } from '../types/JSONTypes';
import AnnotationEngine from '../engine/AnnotationEngine';
import { ClassLike } from '../types/ClassTypes';

/**
 * TODO allow to annotate without function call
 *
 * @param value
 * @constructor
 */
export function JSONSchema<T extends ClassLike>(
  value: Optional<JSONEntityObject | JSONRoot> = {}
) {
  return (target: T) => {
    AnnotationEngine.defineReflectSchema(target, value);
  };
}
