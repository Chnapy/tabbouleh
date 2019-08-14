import { JSONSchema7 } from 'json-schema';

/**
 * Static class generic type.
 */
export type ClassLike<P extends { [k: string]: any } = { [k: string]: any }> = {
  new (): any;
  name: string;
  prototype: P;
};

export type ListClassEntity<C extends ClassLike> = { [k: string]: C };

export type ListJSONSchema<L> = { [k in keyof L]: JSONSchema7 };

/**
 * Args passed to decorators function when using them as expression.
 * For class attributes.
 */
export type DecoratorClassProps<C extends ClassLike = ClassLike> = [
  C['prototype'],
  keyof C['prototype'] & string,
  PropertyDescriptor?
];
