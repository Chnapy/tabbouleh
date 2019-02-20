import { Optional } from '../types/UtilTypes';
import { JSONEntityNumber } from '../types/JSONTypes';
import { AnnotateMultipleProperties } from './AnnotateMultipleProperties';
import { Omit } from 'lodash';


export function JSONNumber(prototype: any, key: string, descriptor?: PropertyDescriptor): void;
export function JSONNumber(value: Omit<Optional<JSONEntityNumber>, 'type'>): Function;
export function JSONNumber(...args: any[]): Function | void {

  return AnnotateMultipleProperties(args, {
    type: 'number'
  });
}
