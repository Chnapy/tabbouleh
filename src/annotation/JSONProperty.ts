import { JSONEntity } from '../types/JSONTypes';
import { AnnotationClassProps } from '../types/ClassTypes';
import { DecoratorEngine } from '../engine/DecoratorEngine';

/**
 * Annotation for JSON attribute properties.
 * Not type oriented.
 */
export function JSONProperty(...args: AnnotationClassProps): void;
export function JSONProperty<J extends JSONEntity<any, any>>(value: Partial<J>): Function;
export function JSONProperty<J extends JSONEntity<any, any>>(
  ...args: [Partial<J>] | AnnotationClassProps
): Function | void {
  return DecoratorEngine.defineProperties(args, {});
}

/**
 * Annotation for JSON attribute **title** property.
 */
export function JSONTitle(value: JSONEntity<any, any>['title']): Function {
  return DecoratorEngine.defineProperties(
    [
      {
        title: value
      }
    ],
    {}
  ) as Function;
}

/**
 * Annotation for JSON attribute **description** property.
 */
export function JSONDescription(value: JSONEntity<any, any>['description']): Function {
  return DecoratorEngine.defineProperties(
    [
      {
        description: value
      }
    ],
    {}
  ) as Function;
}

// TODO JSONRequired disabled, where required props should be defined ?
// export function JSONRequired(prototype: any, key: string, descriptor?: PropertyDescriptor): void;
// export function JSONRequired(value: boolean): Function;
// export function JSONRequired(...args: any[]): Function | void {
//   return AnnotateOneProperty<JSONEntity<any, any>, 'required'>(args, 'required', true);
// }
