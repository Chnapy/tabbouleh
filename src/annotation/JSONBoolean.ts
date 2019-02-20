import { Optional } from '../types/UtilTypes';
import { JSONEntityBoolean } from '../types/JSONTypes';
import { AnnotateMultipleProperties } from './AnnotateMultipleProperties';
import { Omit } from 'lodash';


export function JSONBoolean(prototype: any, key: string, descriptor?: PropertyDescriptor): void;
export function JSONBoolean(value: Omit<Optional<JSONEntityBoolean>, 'type'>): Function;
export function JSONBoolean(...args: any[]): Function | void {

  return AnnotateMultipleProperties(args, {
    type: 'boolean'
  });
}
