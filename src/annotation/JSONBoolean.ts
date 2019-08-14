import { JSONEntityBoolean } from '../types/JSONTypes';
import { Omit } from 'lodash';
import { AnnotationClassProps } from '../types/ClassTypes';
import { DecoratorEngine } from '../engine/DecoratorEngine';

type JSONBooleanValue = Omit<Partial<JSONEntityBoolean>, 'type'>;

/**
 * Annotation for JSON boolean attribute.
 */
export function JSONBoolean(...args: AnnotationClassProps): void;
export function JSONBoolean(value: JSONBooleanValue): Function;
export function JSONBoolean(...args: [JSONBooleanValue] | AnnotationClassProps): Function | void {
  return DecoratorEngine.defineProperties(args, {
    type: 'boolean'
  });
}
