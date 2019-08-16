import { JSONEntity } from '../types/JSONTypes';
import { ClassLike, DecoratorClassProps } from '../types/ClassTypes';
import PropertyEngine from './PropertyEngine';

export class DecoratorEngine {
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

  private static compute<J extends JSONEntity<any, any>, K extends keyof J>(
    defaultValues: Partial<J>,
    value: Partial<J> = {}
  ) {
    value = {
      ...defaultValues,
      ...value
    };

    return <C extends ClassLike>(
      prototype: C['prototype'],
      key: keyof C['prototype'] & string,
      descriptor?: PropertyDescriptor
    ): void => {
      PropertyEngine.defineReflectProperties(prototype, key, value);
    };
  }
}
