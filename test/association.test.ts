import { JSONSchema7 } from 'json-schema';
import Tabbouleh from '../src/engine/Tabbouleh';
import { FOOD_SCHEMA_PROPS } from './genericSample/Food.sample';
import { CircularAssociationSample } from './associationSample/CircularAssociation.sample';
import { CircularDependencyError } from '../src/exception/CircularDependencyError';
import { UndefinedAssociationSample } from './associationSample/UndefinedAssociation.sample';
import { NotAJsonSchemaError } from '../src/exception/NotAJsonSchemaError';
import { NotJsonSchemaAssociationSample } from './associationSample/NotJsonSchemaAssociation.sample';
import { MultipleSameAssociationSample } from './associationSample/MultipleSameAssociation.sample';

const schemaMultipleSameAssociation: JSONSchema7 = {
  type: 'object',
  properties: {
    prop: {
      type: 'object',

      ...FOOD_SCHEMA_PROPS,

      properties: {
        parsley: {
          type: 'string'
        }
      }
    }
  }
};

describe('Check if related schemas work', () => {
  it('should throw a CircularDependencyError on circular association', () => {
    expect(() => Tabbouleh.generateJSONSchema(CircularAssociationSample)).toThrow(
      CircularDependencyError
    );
  });

  it('should throw a NotAJsonSchemaError on undefined association', () => {
    expect(() => Tabbouleh.generateJSONSchema(UndefinedAssociationSample)).toThrow(
      NotAJsonSchemaError
    );
  });

  it('should throw a NotAJsonSchemaError on no-json-schema association', () => {
    expect(() => Tabbouleh.generateJSONSchema(NotJsonSchemaAssociationSample)).toThrow(
      NotAJsonSchemaError
    );
  });

  it('should handle multiple same association', () => {
    expect(Tabbouleh.generateJSONSchema(MultipleSameAssociationSample)).toEqual(
      schemaMultipleSameAssociation
    );
  });
});
