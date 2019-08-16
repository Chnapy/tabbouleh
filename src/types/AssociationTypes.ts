import { ClassLike } from './ClassTypes';
import { JSONSchema7 } from 'json-schema';

export type ClassFn<C extends ClassLike = ClassLike> = () => C;

/**
 * An association between two class
 */
export type Association<C extends ClassLike = ClassLike> = {
  className: C['name'];

  /**
   * Property concerned of the C class source
   */
  key: keyof C['prototype'] & string;

  /**
   * JSON property key concerned. Or null if concerns all the JSON Schema
   */
  jsonPropertyKey: keyof JSONSchema7 | null;

  /**
   * Wrapper of the class targeted
   */
  targetFn: ClassFn;
};

export type AssociationMap = {
  /**
   * [className]: list Association
   */
  [key: string]: Association[];
};
