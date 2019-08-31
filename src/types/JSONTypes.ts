import { JSONSchema7, JSONSchema7TypeName } from 'json-schema';

/**
 * JSON Schema 7
 * Draft 07
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01
 */

/**
 * Primitive type
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1.1
 */
export type JSONTypeName = JSONSchema7TypeName | 'any';

export type JSONEntityDefinition<
  T extends JSONTypeName | JSONTypeName[] = JSONTypeName | JSONTypeName[],
  D = any
> = JSONEntity<T, D> | boolean;

/**
 * Generic entity
 */
export type JSONEntity<T extends JSONTypeName | JSONTypeName[], D> = Pick<
  JSONSchema7,
  | '$id'
  | '$ref'
  | '$schema'
  | '$comment'
  | 'title'
  | 'description'
  | 'readOnly'
  | 'writeOnly'
  | 'definitions'
> & {
  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1
   */
  type: T;
  enum?: D[];
  const?: D;

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.6
   */
  if?: D | boolean;
  then?: D;
  else?: D;

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.7
   */
  allOf?: Omit<JSONEntity<T, D>, 'type'>[];
  oneOf?: Omit<JSONEntity<T, D>, 'type'>[];
  anyOf?: Omit<JSONEntity<T, D>, 'type'>[];
  not?: JSONEntity<T, D>;

  // extends

  /**
   * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-10
   */
  default?: D;
  examples?: D;
};

/**
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-7
 */
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

/**
 * Entity for boolean value
 */
export type JSONEntityBoolean = JSONEntity<'boolean', boolean>;

/**
 * Entity for null value
 */
export type JSONEntityNull = JSONEntity<'null', null>;

/**
 * Entity for number, which can be integer or not
 *
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.2
 */
export type JSONEntityNumber<T extends 'number' | 'integer' = 'number'> = JSONEntity<T, number> &
  JSONPrimitive &
  Pick<JSONSchema7, 'minimum' | 'maximum' | 'exclusiveMinimum' | 'exclusiveMaximum' | 'multipleOf'>;

/**
 * Entity for integer
 */
export type JSONEntityInteger = JSONEntityNumber<'integer'>;

/**
 * Entity for string
 *
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.3
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-8
 */
export type JSONEntityString = JSONEntity<'string', string> &
  JSONPrimitive &
  Pick<JSONSchema7, 'maxLength' | 'minLength' | 'pattern' | 'contentEncoding' | 'contentMediaType'>;

export type JSONEntityObjectProperties<K extends object = any> = { [k in keyof K]: JSONEntityAny };

/**
 * Entity for object
 *
 * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.5
 */
export type JSONEntityObject<K extends object = any> = JSONEntity<'object', object> &
  Pick<JSONSchema7, 'minProperties' | 'maxProperties'> & {
    required?: (keyof K)[];

    properties?: JSONEntityObjectProperties<K>;

    patternProperties?: {
      [k: string]: JSONEntity<any, any>;
    };

    additionalProperties?: JSONEntityDefinition<any, any>;

    // dependencies

    propertyNames?: JSONEntityString;
  };

export type JSONEntityArray<
  T extends JSONEntity<any, any> | JSONEntity<any, any>[] = any
> = JSONEntity<'array', T> &
  Pick<JSONSchema7, 'minItems' | 'maxItems' | 'uniqueItems'> & {
    items?: T;
    additionalItems?: JSONEntityDefinition<any, any>;
    contains?: JSONEntity<any, any>;
  };

export type JSONEntityAny =
  | JSONEntityBoolean
  | JSONEntityString
  | JSONEntityNumber
  | JSONEntityInteger
  | JSONEntityArray
  | JSONEntityObject
  | JSONEntityNull;

export type JSONRoot<K extends object = any> = JSONEntityObject<K>;
