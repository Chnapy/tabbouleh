/**
 * Keys used with reflect-metadata
 */
export enum REFLECT_KEY {
  /**
   * Infer a property type
   */
  TYPE = 'design:type',

  /**
   * Concerns class schema
   */
  JSON_CLASS = 'tabbouleh:class',

  /**
   * Concerns property schema
   */
  JSON_PROPERTY = 'tabbouleh:property',

  /**
   * Concerns associations
   */
  JSON_ASSOCIATIONS = 'tabbouleh:associations'
}
