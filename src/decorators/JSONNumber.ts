import { JSONEntityNumber } from '../types/JSONTypes';
import { Omit } from 'lodash';
import { DecoratorClassProps } from '../types/ClassTypes';
import { DecoratorEngine } from '../engine/DecoratorEngine';

type JSONNumberValue = Omit<Partial<JSONEntityNumber>, 'type'>;

/**
 * Decorator for JSON number attribute.
 */
export function JSONNumber(...args: DecoratorClassProps): void;
export function JSONNumber(value: JSONNumberValue): Function;
export function JSONNumber(...args: [JSONNumberValue] | DecoratorClassProps): Function | void {
  return DecoratorEngine.defineProperties(args, {
    type: 'number'
  });
}
