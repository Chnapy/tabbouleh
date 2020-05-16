import { JSONEntityInteger } from '../types/JSONTypes';
import { DecoratorClassProps } from '../types/ClassTypes';
import { DecoratorEngine } from '../engine/DecoratorEngine';

type JSONIntegerValue = Omit<Partial<JSONEntityInteger>, 'type'>;

/**
 * Decorator for JSON integer attribute.
 */
export function JSONInteger(...args: DecoratorClassProps): void;
export function JSONInteger(value: JSONIntegerValue): Function;
export function JSONInteger(...args: [JSONIntegerValue] | DecoratorClassProps): Function | void {
  return DecoratorEngine.defineProperties(args, {
    type: 'integer',
  });
}
