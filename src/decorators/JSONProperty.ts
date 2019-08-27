import { JSONEntity } from '../types/JSONTypes';
import { DecoratorClassProps } from '../types/ClassTypes';
import { DecoratorEngine } from '../engine/DecoratorEngine';

/**
 * Decorator for JSON attribute properties.
 * Not type oriented.
 */
export function JSONProperty(...args: DecoratorClassProps): void;
export function JSONProperty<J extends JSONEntity<any, any>>(value: Partial<J>): Function;
export function JSONProperty<J extends JSONEntity<any, any>>(
  ...args: [Partial<J>] | DecoratorClassProps
): Function | void {
  return DecoratorEngine.defineProperties(args, {});
}
