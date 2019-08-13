import { JSONEntityInteger } from '../types/JSONTypes';
import { AnnotateMultipleProperties } from './AnnotateMultipleProperties';
import { Omit } from 'lodash';

export function JSONInteger(prototype: any, key: string, descriptor?: PropertyDescriptor): void;
export function JSONInteger(value: Omit<Partial<JSONEntityInteger>, 'type'>): Function;
export function JSONInteger(...args: any[]): Function | void {
  return AnnotateMultipleProperties(args, {
    type: 'integer'
  });
}
