import { JSONEntity } from '../types/JSONTypes';
import { Class, DecoratorClassProps } from '../types/ClassTypes';
import PropertyEngine from './PropertyEngine';
import { JSONSchema7 } from 'json-schema';
import AssociationEngine from './AssociationEngine';
import { ClassResolver } from '../types/AssociationTypes';

/**
 * Handle decorator actions.
 */
export class DecoratorEngine {
  /**
   * Add to the class/property json schema the given value, or create the schema if necessary.
   * To use from decorator, which is used as expression or function.
   *
   * @param args depending of the decorator state, a single tuple of J, or DecoratorClassProps
   * @param defaultValues initialValues which may be overridden
   */
  static defineProperties<J extends JSONEntity<any, any>>(
    args: [Partial<J>] | DecoratorClassProps,
    defaultValues: Partial<J>
  ): ReturnType<typeof DecoratorEngine['compute']> | void {
    if (args.length === 1) {
      const value = args[0];

      return DecoratorEngine.compute(defaultValues, value);
    }

    const prototype = args[0];
    const key = args[1];

    DecoratorEngine.compute(defaultValues)(prototype, key);
  }

  /**
   * Return a decorator function
   * which handle association mapping and define the class/property json schema.
   *
   * @param defaultValues
   * @param value
   */
  private static compute<J extends JSONEntity<any, any>, K extends keyof J>(
    defaultValues: Partial<J>,
    value: Partial<J> = {}
  ) {
    value = {
      ...defaultValues,
      ...value
    };

    return <C extends Class>(
      prototype: C['prototype'],
      key: keyof C['prototype'] & string,
      descriptor?: PropertyDescriptor
    ): void => {
      const valueSchema: JSONSchema7 = {};

      // If we found ClassResolver, we create association for each of them
      Object.keys(value).forEach(_k => {
        const k: keyof JSONSchema7 = _k as any;
        const v: ClassResolver | any = value[k as keyof J];

        if (typeof v === 'function') {
          AssociationEngine.addAssociation(prototype, key, k, v);
        } else {
          (valueSchema as any)[k] = v;
        }
      });

      PropertyEngine.defineReflectProperties(prototype, key, valueSchema);
    };
  }
}
