import { JSONEntity } from '../types/JSONTypes';
import AnnotateOneProperty from './AnnotateOneProperty';
import { AnnotateMultipleProperties } from './AnnotateMultipleProperties';

export function JSONProperty(prototype: any, key: string, descriptor?: PropertyDescriptor): void;
export function JSONProperty<J extends JSONEntity<any, any>>(value: Partial<J>): Function;
export function JSONProperty<J extends JSONEntity<any, any>>(...args: any[]): Function | void {
  return AnnotateMultipleProperties(args, {});
}

export function JSONTitle(value: string) {
  return AnnotateOneProperty<JSONEntity<any, any>, 'title'>([value], 'title', value) as Function;
}

export function JSONDescription(value: string) {
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
