import { ClassLike } from './ClassTypes';
import { JSONSchema7 } from 'json-schema';

export type Association<C extends ClassLike = ClassLike> = {
  className: C['name'];

  // class property key
  key: keyof C['prototype'] & string;

  jsonPropertyKey: keyof JSONSchema7 | null;

  // class targeted
  target: ClassLike;
};

export type AssociationMap = {
  // class name
  [key: string]: Association[];
};
