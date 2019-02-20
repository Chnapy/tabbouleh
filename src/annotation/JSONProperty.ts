import { Optional } from '../types/UtilTypes';
import {JSONEntity, JSONEntityString} from '../types/JSONTypes';
import AnnotationEngine from '../engine/AnnotationEngine';
import { ClassLike } from '../types/ClassTypes';
import FunctionAnnotation from "./FunctionAnnotation";

export function JSONProperty(prototype: any, key: string, descriptor?: PropertyDescriptor): void;
export function JSONProperty<J extends JSONEntity<any, any>>(value: Optional<J>): Function;
export function JSONProperty<J extends JSONEntity<any, any>>(...args: any[]): Function | void {

  const compute = (value: Optional<J> = {}) => {

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

export function JSONString(value: Optional<JSONEntityString> = {}) {
  return JSONProperty<JSONEntityString>(value);
}

export function JSONRequired(prototype: any, key: string, descriptor?: PropertyDescriptor): void;
export function JSONRequired(value: boolean): Function;
export function JSONRequired(...args: any[]): Function | void {

  return FunctionAnnotation<JSONEntityString, 'required'>(args, 'required', true);
}
