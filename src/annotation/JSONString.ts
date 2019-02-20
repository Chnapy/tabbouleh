import { Optional } from '../types/UtilTypes';
import { JSONEntityString } from '../types/JSONTypes';
import { AnnotateMultipleProperties } from './AnnotateMultipleProperties';
import { Omit } from 'lodash';


export function JSONString(prototype: any, key: string, descriptor?: PropertyDescriptor): void;
export function JSONString(value: Omit<Optional<JSONEntityString>, 'type'>): Function;
export function JSONString(...args: any[]): Function | void {

  return AnnotateMultipleProperties(args, {
    type: 'string'
  });
}
