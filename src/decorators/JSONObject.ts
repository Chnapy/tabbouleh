import { JSONEntityNumber, JSONEntityObject } from '../types/JSONTypes';
import { Omit } from 'lodash';
import { ClassLike, DecoratorClassProps } from '../types/ClassTypes';
import { DecoratorEngine } from '../engine/DecoratorEngine';
import PropertyEngine from '../engine/PropertyEngine';
import SchemaEngine from '../engine/SchemaEngine';
import { NotAJsonSchemaError } from '../exception/NotAJsonSchemaError';
import AssociationEngine from '../engine/AssociationEngine';

type JSONObjectValue = Omit<Partial<JSONEntityObject>, 'type'> | (() => ClassLike);

/**
 * Decorator for JSON object attribute.
 */
export function JSONObject(...args: DecoratorClassProps): void;
export function JSONObject(value: JSONObjectValue): Function;
export function JSONObject(...args: [JSONObjectValue] | DecoratorClassProps): Function | void {
  // Related class
  if (args.length === 1 && typeof args[0] === 'function') {
    return (
      prototype: ClassLike['prototype'],
      key: keyof ClassLike['prototype'] & string,
      descriptor?: PropertyDescriptor
    ): void => {
      const Class = (args as [Function])[0]();

      AssociationEngine.addAssociation(prototype, key, null, Class);
    };
  }

  return DecoratorEngine.defineProperties(args as any, {
    type: 'object'
  });
}
