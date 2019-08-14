import { JSONEntity } from '../types/JSONTypes';
import AnnotateOneProperty from './AnnotateOneProperty';
import { AnnotateMultipleProperties } from './AnnotateMultipleProperties';
import { AnnotationClassProps } from '../types/ClassTypes';

/**
 * Annotation for JSON attribute properties.
 * Not type oriented.
 */
export function JSONProperty(...args: AnnotationClassProps): void;
export function JSONProperty<J extends JSONEntity<any, any>>(value: Partial<J>): Function;
export function JSONProperty<J extends JSONEntity<any, any>>(
  ...args: [Partial<J>] | AnnotationClassProps
): Function | void {
  return AnnotateMultipleProperties(args, {});
}

/**
 * Annotation for JSON attribute **title** property.
 */
export function JSONTitle(value: JSONEntity<any, any>['title']): Function {
  return AnnotateOneProperty<JSONEntity<any, any>, 'title'>([value], 'title', value) as Function;
}

/**
 * Annotation for JSON attribute **description** property.
 */
export function JSONDescription(value: JSONEntity<any, any>['description']): Function {
  return AnnotateOneProperty<JSONEntity<any, any>, 'description'>(
    [value],
    'description',
    value
  ) as Function;
}

// TODO JSONRequired disabled, where required props should be defined ?
// export function JSONRequired(prototype: any, key: string, descriptor?: PropertyDescriptor): void;
// export function JSONRequired(value: boolean): Function;
// export function JSONRequired(...args: any[]): Function | void {
//   return AnnotateOneProperty<JSONEntity<any, any>, 'required'>(args, 'required', true);
// }
