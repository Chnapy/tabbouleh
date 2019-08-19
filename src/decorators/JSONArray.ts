import { JSONEntityArray, JSONTypeName } from '../types/JSONTypes';
import { ClassLike } from '../types/ClassTypes';
import { DecoratorEngine } from '../engine/DecoratorEngine';
import AssociationEngine from '../engine/AssociationEngine';
import { ClassFn } from '../types/AssociationTypes';

// array schema props | item class fn | item json type
type JSONArrayValue = Omit<Partial<JSONEntityArray>, 'type'> | ClassFn | JSONTypeName;

/**
 * Decorator for JSON object attribute.
 */
export function JSONArray(value: JSONArrayValue): Function {
  // Related class
  if (typeof value === 'function') {
    return (
      prototype: ClassLike['prototype'],
      key: keyof ClassLike['prototype'] & string,
      descriptor?: PropertyDescriptor
    ): void => {
      AssociationEngine.addAssociation(prototype, key, 'items', value);
    };
  }

  // Given type
  if (typeof value === 'string') {
    return (
      prototype: ClassLike['prototype'],
      key: keyof ClassLike['prototype'] & string,
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
