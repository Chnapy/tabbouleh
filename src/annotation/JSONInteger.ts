import { JSONEntityInteger } from '../types/JSONTypes';
import { Omit } from 'lodash';
import { AnnotationClassProps } from '../types/ClassTypes';
import { DecoratorEngine } from '../engine/DecoratorEngine';

type JSONIntegerValue = Omit<Partial<JSONEntityInteger>, 'type'>;

/**
 * Annotation for JSON integer attribute.
 */
export function JSONInteger(...args: AnnotationClassProps): void;
export function JSONInteger(value: JSONIntegerValue): Function;
export function JSONInteger(...args: [JSONIntegerValue] | AnnotationClassProps): Function | void {
  return DecoratorEngine.defineProperties(args, {
    type: 'integer'
  });
}
