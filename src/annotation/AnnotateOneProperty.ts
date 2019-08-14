import { JSONEntity } from '../types/JSONTypes';
import { AnnotationClassProps, ClassLike } from '../types/ClassTypes';
import AnnotationEngine from '../engine/AnnotationEngine';

function compute<J extends JSONEntity<any, any>, K extends keyof J>(propertyKey: K, value: J[K]) {
  return <C extends ClassLike>(
    prototype: C['prototype'],
    key: keyof C['prototype'] & string,
    descriptor?: PropertyDescriptor
  ): void => {
    AnnotationEngine.defineReflectProperty<C, J, K>(prototype, key, propertyKey, value);
  };
}

/**
 * Define one property from an annotation.
 */
export default function AnnotateOneProperty<J extends JSONEntity<any, any>, K extends keyof J>(
  args: [J[K]] | AnnotationClassProps,
  propertyKey: K,
  defaultValue: J[K]
): ReturnType<typeof compute> | void {
  if (args.length === 1) {
    const value = args[0];

    return compute(propertyKey, value);
  }

  const prototype = args[0];
  const key = args[1];

  compute(propertyKey, defaultValue)(prototype, key);
}
