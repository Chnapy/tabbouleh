import 'reflect-metadata';
import { JSONEntityObject } from '../types/JSONTypes';
import AnnotationEngine from './AnnotationEngine';
import { ClassLike, ListClassEntity, ListJSONSchema } from '../types/ClassTypes';
import { NotAJsonSchemaError } from '../exception/NotAJsonSchemaError';

export default class Tabbouleh {
  static generateJSONSchema<C extends ClassLike = ClassLike>(target: C): JSONEntityObject {
    const schema = Tabbouleh.getReflectSchema(target);

    if (!schema) {
      throw new NotAJsonSchemaError(target);
    }

    return Tabbouleh.computeJSONClass(target, schema);
  }

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

  private static getReflectSchema(target: ClassLike): JSONEntityObject | undefined {
    return AnnotationEngine.getReflectSchema(target);
  }

  private static computeJSONClass(target: ClassLike, schema: JSONEntityObject): JSONEntityObject {
    schema.properties = AnnotationEngine.getReflectProperties(target.prototype);

    return schema;
  }
}
