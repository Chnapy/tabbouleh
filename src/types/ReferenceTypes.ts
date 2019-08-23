import { Class } from './ClassTypes';
import { JSONSchema7 } from 'json-schema';

export type ClassResolver<C extends Class = Class> = () => C;

/**
 * A reference between two class
 */
export type Reference<C extends Class = Class> = {
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
   * Resolver of the class targeted
   */
  targetFn: ClassResolver;
};

export type ReferenceMap = {
  /**
   * [className]: list Reference
   */
  [key: string]: Reference[];
};
