import { JSONEntityObject } from '../types/JSONTypes';
import { Class, DecoratorClassProps } from '../types/ClassTypes';
import { DecoratorEngine } from '../engine/DecoratorEngine';
import ReferenceEngine from '../engine/ReferenceEngine';
import { ClassResolver } from '../types/ReferenceTypes';

type JSONObjectValue = Omit<Partial<JSONEntityObject>, 'type'> | ClassResolver;

/**
 * Decorator for JSON object attribute.
 */
export function JSONObject(...args: DecoratorClassProps): void;
export function JSONObject(value: JSONObjectValue): Function;
export function JSONObject(...args: [JSONObjectValue] | DecoratorClassProps): Function | void {
  // Related class
  if (args.length === 1 && typeof args[0] === 'function') {
    return (
      prototype: Class['prototype'],
      key: keyof Class['prototype'] & string,
      descriptor?: PropertyDescriptor
    ): void => {
      const [classFn] = args as [ClassResolver];

      ReferenceEngine.addReference(prototype, key, null, classFn);
    };
  }

  return DecoratorEngine.defineProperties(args as any, {
    type: 'object'
  });
}
