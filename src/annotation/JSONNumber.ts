import { JSONEntityNumber } from '../types/JSONTypes';
import { AnnotateMultipleProperties } from './AnnotateMultipleProperties';
import { Omit } from 'lodash';
import { AnnotationClassProps } from '../types/ClassTypes';

type JSONNumberValue = Omit<Partial<JSONEntityNumber>, 'type'>;

/**
 * Annotation for JSON number attribute.
 */
export function JSONNumber(...args: AnnotationClassProps): void;
export function JSONNumber(value: JSONNumberValue): Function;
export function JSONNumber(...args: [JSONNumberValue] | AnnotationClassProps): Function | void {
  return AnnotateMultipleProperties(args, {
    type: 'number'
  });
}
