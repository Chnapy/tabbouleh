import { JSONEntityString } from '../types/JSONTypes';
import { Omit } from 'lodash';
import { DecoratorClassProps } from '../types/ClassTypes';
import { DecoratorEngine } from '../engine/DecoratorEngine';

type JSONStringValue = Omit<Partial<JSONEntityString>, 'type'>;

/**
 * Decorator for JSON string attribute.
 */
export function JSONString(...args: DecoratorClassProps): void;
export function JSONString(value: JSONStringValue): Function;
export function JSONString(...args: [JSONStringValue] | DecoratorClassProps): Function | void {
  return DecoratorEngine.defineProperties(args, {
    type: 'string'
  });
}
