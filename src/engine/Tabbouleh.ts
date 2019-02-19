import 'reflect-metadata';
import { JSONEntity, JSONEntityObject } from '../types/JSONTypes';
import AnnotationEngine from './AnnotationEngine';
import { ClassLike, ListClassEntity, ListJSONSchema } from '../types/ClassTypes';
import NotAJsonSchemaError from '../exception/NotAJsonSchemaError';

export default class Tabbouleh {
  static generateJSONSchemas<C extends ClassLike, L extends ListClassEntity<C>>(
    target: L
  ): ListJSONSchema<L> {
    const obj = {} as ListJSONSchema<L>;

    for (const k of Object.keys(target)) {
      const c = target[k];

      const schema = Tabbouleh.getReflectSchema(c);

      if (schema) {
        obj[k] = Tabbouleh.computeJSONClass(c, schema);

      } else {
        Tabbouleh.throwIfHasJSONProperties(c);
      }
    }

    return obj;
  }

  private static getReflectSchema(target: ClassLike): JSONEntityObject | undefined {
    return AnnotationEngine.getReflectSchema(target);
  }

  private static throwIfHasJSONProperties(target: ClassLike): void | never {
    if (!AnnotationEngine.getReflectSchema(target)) {
      throw new NotAJsonSchemaError(target);
    }
  }

  private static computeJSONClass(target: ClassLike, schema: JSONEntityObject): JSONEntity<any, any> {

    schema.properties = AnnotationEngine.getReflectProperties(target.prototype);

    return schema;
  }
}
