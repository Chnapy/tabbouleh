import { Optional } from '../types/UtilTypes';
import { JSONEntity } from '../types/JSONTypes';
import AnnotationEngine from '../engine/AnnotationEngine';
import { ClassLike } from '../types/ClassTypes';

export function JSONProperty<J extends JSONEntity<any, any>>(value: Optional<J> = {}) {
  return <T extends ClassLike>(
    prototype: T['prototype'],
    key: keyof T['prototype'] & string,
    descriptor?: PropertyDescriptor
  ): void => {
    AnnotationEngine.defineReflectProperties(prototype, key, value);
  };
}
