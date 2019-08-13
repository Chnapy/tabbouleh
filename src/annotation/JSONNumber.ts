import { JSONEntityNumber } from '../types/JSONTypes';
import { AnnotateMultipleProperties } from './AnnotateMultipleProperties';
import { Omit } from 'lodash';

export function JSONNumber(prototype: any, key: string, descriptor?: PropertyDescriptor): void;
export function JSONNumber(value: Omit<Partial<JSONEntityNumber>, 'type'>): Function;
export function JSONNumber(...args: any[]): Function | void {
  return AnnotateMultipleProperties(args, {
    type: 'number'
  });
}
