import 'reflect-metadata';
import { JSONEntity } from '../types/JSONTypes';
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

      if (Tabbouleh.isJSONClass(c)) {
        obj[k] = Tabbouleh.computeJSONClass(c);
      } else {
        Tabbouleh.throwIfHasJSONProperties(c);
      }
    }

    return obj;
  }

  private static isJSONClass(target: ClassLike): boolean {
    return !!AnnotationEngine.getReflectClassEntity(target);
  }
  private static throwIfHasJSONProperties(target: ClassLike): void | never {
    if (!AnnotationEngine.getReflectClassEntity(target)) {
      throw new NotAJsonClassError(target);
    }
  }

  private static computeJSONClass(target: ClassLike): JSONEntity<any, any> {
    const entity = AnnotationEngine.getReflectClassEntity(target);

    if (!entity) {
      throw new NotAJsonClassError(target);
    }

    entity.properties = AnnotationEngine.getReflectAttributesObject(target.prototype);

    return entity;
  }
}
