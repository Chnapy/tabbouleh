import { ClassLike } from './ClassTypes';
import { JSONSchema7 } from 'json-schema';

export type ClassFn<C extends ClassLike = ClassLike> = () => C;

export type Association<C extends ClassLike = ClassLike> = {
  className: C['name'];

  /**
   * class property key
   */
  key: keyof C['prototype'] & string;

  jsonPropertyKey: keyof JSONSchema7 | null;

  /**
   * class targeted
   */
  targetFn: ClassFn;
};

export type AssociationMap = {
  /**
   * [className]: list Association
   */
  [key: string]: Association[];
};
