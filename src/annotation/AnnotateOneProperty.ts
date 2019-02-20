import { JSONEntity } from '../types/JSONTypes';
import { ClassLike } from '../types/ClassTypes';
import AnnotationEngine from '../engine/AnnotationEngine';

export default function AnnotateOneProperty<J extends JSONEntity<any, any>, K extends keyof J>(args: any[], propertyKey: K, defaultValue: J[K]): Function | void {

  const compute = (value: J[K]) => {

    return <C extends ClassLike>(
      prototype: C['prototype'],
      key: keyof C['prototype'] & string,
      descriptor?: PropertyDescriptor
    ): void => {
      AnnotationEngine.defineReflectProperty<C, J, K>(prototype, key, propertyKey, value);
    };
  };

  if(args.length === 1) {

    const value = args[0];

    return compute(value);
  } else {

    const prototype = args[0];
    const key = args[1];

    compute(defaultValue)(prototype, key);
  }
}
