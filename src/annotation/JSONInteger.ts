import { JSONEntityInteger } from '../types/JSONTypes';
import { AnnotateMultipleProperties } from './AnnotateMultipleProperties';
import { Omit } from 'lodash';
import { AnnotationClassProps } from '../types/ClassTypes';

type JSONIntegerValue = Omit<Partial<JSONEntityInteger>, 'type'>;

/**
 * Annotation for JSON integer attribute.
 */
export function JSONInteger(...args: AnnotationClassProps): void;
export function JSONInteger(value: JSONIntegerValue): Function;
export function JSONInteger(...args: [JSONIntegerValue] | AnnotationClassProps): Function | void {
  return AnnotateMultipleProperties(args, {
    type: 'integer'
  });
}
