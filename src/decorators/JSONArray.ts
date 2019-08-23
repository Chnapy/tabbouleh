import { JSONEntityArray, JSONTypeName } from '../types/JSONTypes';
import { Class } from '../types/ClassTypes';
import { DecoratorEngine } from '../engine/DecoratorEngine';
import AssociationEngine from '../engine/AssociationEngine';
import { ClassResolver } from '../types/AssociationTypes';

// array schema props | item class resolver | item json type
type JSONArrayValue = Omit<Partial<JSONEntityArray>, 'type'> | ClassResolver | JSONTypeName;

/**
 * Decorator for JSON array attribute.
 */
export function JSONArray(value: JSONArrayValue): Function {
  // Related class
  if (typeof value === 'function') {
    return (
      prototype: Class['prototype'],
      key: keyof Class['prototype'] & string,
      descriptor?: PropertyDescriptor
    ): void => {
      AssociationEngine.addAssociation(prototype, key, 'items', value);
    };
  }

  // Given type
  if (typeof value === 'string') {
    return (
      prototype: Class['prototype'],
      key: keyof Class['prototype'] & string,
      descriptor?: PropertyDescriptor
    ): void => {
      DecoratorEngine.defineProperties([prototype, key, descriptor], {
        type: 'array',
        items: {
          type: value
        }
      });
    };
  }

  return DecoratorEngine.defineProperties<JSONEntityArray>([value], {
    type: 'array'
  }) as Function;
}
