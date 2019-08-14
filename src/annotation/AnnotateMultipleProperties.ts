import { JSONEntity } from '../types/JSONTypes';
import { AnnotationClassProps, ClassLike } from '../types/ClassTypes';
import PropertyEngine from '../engine/PropertyEngine';

function compute<J extends JSONEntity<any, any>, K extends keyof J>(
  defaultValues: Partial<J>,
  value: Partial<J> = {}
) {
  value = {
    ...defaultValues,
    ...value
  };

  return <C extends ClassLike>(
    prototype: C['prototype'],
    key: keyof C['prototype'] & string,
    descriptor?: PropertyDescriptor
  ): void => {
    PropertyEngine.defineReflectProperties(prototype, key, value);
  };
}

/**
 * Define multiple properties from an annotation.
 */
export function AnnotateMultipleProperties<J extends JSONEntity<any, any>>(
  args: [Partial<J>] | AnnotationClassProps,
  defaultValues: Partial<J>
): ReturnType<typeof compute> | void {
  if (args.length === 1) {
    const value = args[0];

    return compute(defaultValues, value);
  }

  const prototype = args[0];
  const key = args[1];

  compute(defaultValues)(prototype, key);
}
