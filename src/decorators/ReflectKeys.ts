/**
 * Keys used with reflect-metadata
 */
export enum REFLECT_KEY {
  /**
   * Infer a property type
   */
  TYPE = 'design:type',

  /**
   * Concerns json schema
   */
  JSON_SCHEMA = 'tabbouleh:schema',

  /**
   * Concerns object properties schema
   */
  JSON_PROPERTY = 'tabbouleh:property',

  /**
   * Concerns references
   */
  JSON_REFERENCE = 'tabbouleh:references',
}
