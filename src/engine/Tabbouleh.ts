import 'reflect-metadata';
import { JSONEntity, JSONEntityObject } from '../types/JSONTypes';
import AnnotationEngine from './AnnotationEngine';
import { ClassLike, ListClassEntity, ListJSONEntity } from '../types/ClassTypes';
import NotAJsonClassError from '../exception/NotAJsonClassError';

export default class Tabbouleh {
  static generateJSONSchemas<C extends ClassLike, L extends ListClassEntity<C>>(
    target: L
  ): ListJSONEntity<L> {
    const obj = {} as ListJSONEntity<L>;

    for (const k of Object.keys(target)) {
      const c = target[k];

      const entity = Tabbouleh.getReflectEntity(c);

      if (entity) {
        obj[k] = Tabbouleh.computeJSONClass(c, entity);

      } else {
        Tabbouleh.throwIfHasJSONProperties(c);
      }
    }

    return obj;
  }

  private static getReflectEntity(target: ClassLike): JSONEntityObject | undefined {
    return AnnotationEngine.getReflectClassEntity(target);
  }

  private static throwIfHasJSONProperties(target: ClassLike): void | never {
    if (!AnnotationEngine.getReflectClassEntity(target)) {
      throw new NotAJsonClassError(target);
    }
  }

  private static computeJSONClass(target: ClassLike, entity: JSONEntityObject): JSONEntity<any, any> {

    entity.properties = AnnotationEngine.getReflectAttributesObject(target.prototype);

    return entity;
  }
}
