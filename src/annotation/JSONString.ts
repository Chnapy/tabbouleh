import { JSONEntityString } from '../types/JSONTypes';
import { Omit } from 'lodash';
import { AnnotationClassProps } from '../types/ClassTypes';
import { DecoratorEngine } from '../engine/DecoratorEngine';

type JSONStringValue = Omit<Partial<JSONEntityString>, 'type'>;

/**
 * Annotation for JSON string attribute.
 */
export function JSONString(...args: AnnotationClassProps): void;
export function JSONString(value: JSONStringValue): Function;
export function JSONString(...args: [JSONStringValue] | AnnotationClassProps): Function | void {
  return DecoratorEngine.defineProperties(args, {
    type: 'string'
  });
}
