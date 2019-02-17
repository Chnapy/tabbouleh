import { Omit } from 'lodash';

export type JSONType =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'object'
  | 'array'
  | 'null'
  | 'any';

export type JSONEntity<T extends JSONType | JSONType[], D> = {
  type: T;

  title?: string;
  description?: string;

  disallow?: JSONType | JSONType[];

  required?: boolean;

  default?: D;

  enum?: D[];

  const?: D;

  allOf?: Omit<JSONEntity<T, D>, 'type'>[];

  oneOf?: Omit<JSONEntity<T, D>, 'type'>[];

  anyOf?: Omit<JSONEntity<T, D>, 'type'>[];

  not?: JSONEntity<T, D>;

  // TODO find programmatic solution
  // extends

  // TODO find programmatic solution
  // id

  // TODO find programmatic solution
  // $ref

  // TODO
  // dependencies
};

type JSONPrimitive = {
  format?:
    | 'date-time'
    | 'date'
    | 'time'
    | 'utc-millisec'
    | 'regex'
    | 'color'
    | 'style'
    | 'phone'
    | 'uri'
    | 'email'
    | 'ip-address'
    | 'ipv6'
    | 'host-name';
};

export type JSONEntityBoolean = JSONEntity<'boolean', boolean>;

export type JSONEntityNull = JSONEntity<'null', null>;

export type JSONEntityNumber<T extends 'number' | 'integer' = 'number'> = JSONEntity<T, number> &
  JSONPrimitive & {
    minimum?: number;
    maximum?: number;
    exclusiveMinimum?: number | boolean;
    exclusiveMaximum?: number | boolean;
    multipleOf?: number;
    divisibleBy?: number;
  };

export type JSONEntityInteger = JSONEntityNumber<'integer'>;

export type JSONEntityString = JSONEntity<'string', string> &
  JSONPrimitive & {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };

export type JSONEntityObjectProperties<K extends object = any> = { [k in keyof K]: JSONEntityAny };

export type JSONEntityObject<K extends object = any> = JSONEntity<'object', object> & {
  minProperties?: number;
  maxProperties?: number;

  properties?: JSONEntityObjectProperties<K>;

  patternProperties?: {
    [k: string]: JSONEntity<any, any>;
  };

  additionalProperties?: boolean | JSONEntity<any, any>;

  required?: boolean | (keyof K)[];
};

export type JSONEntityArray<
  T extends JSONEntity<any, any> | JSONEntity<any, any>[] = any
> = JSONEntity<'array', T> & {
  minItems: number;
  maxItems: number;
  uniqueItems: boolean;

  items: T;

  additionalItems: boolean | JSONEntity<any, any>;
};

export type JSONEntityAny =
  | JSONEntityBoolean
  | JSONEntityString
  | JSONEntityNumber
  | JSONEntityInteger
  | JSONEntityArray
  | JSONEntityObject
  | JSONEntityNull
  | JSONEntity<'any', any>;

export interface JSONRoot<K extends object = any> extends JSONEntityObject<K> {
  $schema: string;
  $id: string;
}