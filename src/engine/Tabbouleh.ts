import 'reflect-metadata';
import { ClassLike, ListClassEntity, ListJSONSchema } from '../types/ClassTypes';
import { JSONSchema7 } from 'json-schema';
import SchemaEngine from './SchemaEngine';

/**
 * Tabbouleh simply give a valid JSON Schema (draft 7) from a model class
 * which has been decorated with properties.
 */
export default class Tabbouleh {
  /**
   * From a class, give a JSON Schema (draft 7).
   * The class MUST be a valid JSONSchema entity, decorated.
   */
  static generateJSONSchema<C extends ClassLike = ClassLike>(target: C): JSONSchema7 {
    return SchemaEngine.getComputedJSONSchema(target);
  }

  /**
   * From an object of classes, give an object of JSON Schema (draft 7).
   * The classes MUST be valid JSONSchema entities, decorated.
   * The object returned follow the same mapping as the one given.
   */
  static generateMultipleJSONSchemas<C extends ClassLike, L extends ListClassEntity<C>>(
    target: L
  ): ListJSONSchema<L> {
    const obj = {} as ListJSONSchema<L>;

    for (const k of Object.keys(target) as (keyof L)[]) {
      const c = target[k];

      obj[k] = Tabbouleh.generateJSONSchema(c);
    }

    return obj;
  }
}
