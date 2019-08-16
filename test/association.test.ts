import { JSONSchema7 } from 'json-schema';
import { CSample5, CS5_SCHEMA_PROPS } from './samples/CSample5';
import Tabbouleh from '../src/engine/Tabbouleh';
import { FOOD_SCHEMA_PROPS } from './genericSample/Food.sample';
import { CircularAssociationSample } from './associationSamples/CircularAssociation.sample';
import { CircularDependencyError } from '../src/exception/CircularDependencyError';
import { UndefinedAssociationSample } from './associationSamples/UndefinedAssociation.sample';
import { NotAJsonSchemaError } from '../src/exception/NotAJsonSchemaError';
import { NotJsonSchemaAssociationSample } from './associationSamples/NotJsonSchemaAssociation.sample';
import { MultipleSameAssociationSample } from './associationSamples/MultipleSameAssociation.sample';

const schemaCSample5: JSONSchema7 = {
  type: 'object',

  ...CS5_SCHEMA_PROPS,

  properties: {
    type: {
      type: 'string'
    },

    price: {
      type: 'number'
    },

    food: {
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
  it('should handle nested object', () => {
    expect(Tabbouleh.generateJSONSchema(CSample5)).toEqual(schemaCSample5);
  });

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
