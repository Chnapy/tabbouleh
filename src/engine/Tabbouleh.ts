import 'reflect-metadata';
import PropertyEngine from './PropertyEngine';
import { ClassLike, ListClassEntity, ListJSONSchema } from '../types/ClassTypes';
import { NotAJsonSchemaError } from '../exception/NotAJsonSchemaError';
import { JSONSchema7 } from 'json-schema';
import SchemaEngine from './SchemaEngine';

/**
 * Tabbouleh simply give a valid JSON Schema (draft 7) from a model class
 * which has been annotate with properties.
 */
export default class Tabbouleh {
  /**
   * From a class, give a JSON Schema (draft 7).
   * The class MUST be a valid JSONSchema entity, annotated.
   */
  static generateJSONSchema<C extends ClassLike = ClassLike>(target: C): JSONSchema7 {
    const schema = Tabbouleh.getReflectSchema(target);

    if (!schema) {
      throw new NotAJsonSchemaError(target);
    }

    return Tabbouleh.computeJSONClass(target, schema);
  }

  /**
   * From an object of classes, give an object of JSON Schema (draft 7).
   * The classes MUST be valid JSONSchema entities, annotated.
   * The object returned follow the same mapping as the one given.
   */
  static generateMultipleJSONSchemas<C extends ClassLike, L extends ListClassEntity<C>>(
    target: L
  ): ListJSONSchema<L> {
    const obj = {} as ListJSONSchema<L>;

    for (const k of Object.keys(target)) {
      const c = target[k];

      obj[k] = Tabbouleh.generateJSONSchema(c);
    }

    return obj;
  }

  private static getReflectSchema(target: ClassLike): JSONSchema7 | undefined {
    return SchemaEngine.getReflectSchema(target);
  }

  private static computeJSONClass(target: ClassLike, schema: JSONSchema7): JSONSchema7 {
    schema.properties = PropertyEngine.getReflectProperties(target.prototype);

    return schema;
  }
}
