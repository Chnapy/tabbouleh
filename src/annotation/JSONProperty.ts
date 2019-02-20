import { Optional } from '../types/UtilTypes';
import {JSONEntity, JSONEntityString} from '../types/JSONTypes';
import AnnotationEngine from '../engine/AnnotationEngine';
import { ClassLike } from '../types/ClassTypes';
import FunctionAnnotation from "./FunctionAnnotation";

export function JSONProperty<J extends JSONEntity<any, any>>(value: Optional<J> = {}): Function {
  return <T extends ClassLike>(
    prototype: T['prototype'],
    key: keyof T['prototype'] & string,
    descriptor?: PropertyDescriptor
  ): void => {
    AnnotationEngine.defineReflectProperties(prototype, key, value);
  };
}

export function JSONString(value: Optional<JSONEntityString> = {}) {
  return JSONProperty<JSONEntityString>(value);
}

export function JSONRequired(prototype: any, key: string, descriptor?: PropertyDescriptor): void;
export function JSONRequired(value: boolean): Function;
export function JSONRequired(...args: any[]): Function | void {

  return FunctionAnnotation<JSONEntityString, 'required'>(args, 'required', true);
}
