import { JSONEntityBoolean } from '../types/JSONTypes';
import { Omit } from 'lodash';
import { DecoratorClassProps } from '../types/ClassTypes';
import { DecoratorEngine } from '../engine/DecoratorEngine';

type JSONBooleanValue = Omit<Partial<JSONEntityBoolean>, 'type'>;

/**
 * Decorator for JSON boolean attribute.
 */
export function JSONBoolean(...args: DecoratorClassProps): void;
export function JSONBoolean(value: JSONBooleanValue): Function;
export function JSONBoolean(...args: [JSONBooleanValue] | DecoratorClassProps): Function | void {
  return DecoratorEngine.defineProperties(args, {
    type: 'boolean'
  });
}
