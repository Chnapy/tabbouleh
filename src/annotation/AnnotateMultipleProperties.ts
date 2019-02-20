import { JSONEntity } from '../types/JSONTypes';
import { Optional } from '../types/UtilTypes';
import { ClassLike } from '../types/ClassTypes';
import AnnotationEngine from '../engine/AnnotationEngine';

export function AnnotateMultipleProperties<J extends JSONEntity<any, any>, O extends object>(args: any[], defaultValues: Optional<J>): Function | void {

  const compute = (value: Optional<J> = {}) => {

    value = {
      ...defaultValues,
      ...value
    };

    return <C extends ClassLike>(
      prototype: C['prototype'],
      key: keyof C['prototype'] & string,
      descriptor?: PropertyDescriptor
    ): void => {
      AnnotationEngine.defineReflectProperties(prototype, key, value);
    };
  };

  if(args.length === 1) {

    const value = args[0];

    return compute(value);
  } else {

    const prototype = args[0];
    const key = args[1];

    compute()(prototype, key);
  }
}
