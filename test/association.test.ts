import {JSONSchema7} from 'json-schema';
import Tabbouleh from '../src/engine/Tabbouleh';
import {FOOD_SCHEMA_PROPS, FoodSample} from './genericSample/Food.sample';
import {CircularAssociationSample} from './associationSample/CircularAssociation.sample';
import {UndefinedAssociationSample} from './associationSample/UndefinedAssociation.sample';
import {NotAJsonSchemaError} from '../src/exception/NotAJsonSchemaError';
import {NotJsonSchemaAssociationSample} from './associationSample/NotJsonSchemaAssociation.sample';
import {MultipleSameAssociationSample} from './associationSample/MultipleSameAssociation.sample';
import AssociationEngine from "../src/engine/AssociationEngine";

const foodSampleID = AssociationEngine.generateSchemaID(FoodSample);

const schemaMultipleSameAssociation: JSONSchema7 = {
  type: 'object',
  definitions: {
    [foodSampleID]: {
      type: 'object',

      ...FOOD_SCHEMA_PROPS,

      properties: {
        parsley: {
          type: 'string'
        }
      }
    }
  },
  properties: {
    prop: {
      $ref: AssociationEngine.generateRef(FoodSample)
    }
  }
};

const schemaCircularAssociation: JSONSchema7 = {
  type: 'object',
  properties: {
    value: {
      type: 'object'
    },
    inception: {
      $ref: AssociationEngine.generateRef(CircularAssociationSample, CircularAssociationSample)
    }
  }
};

describe('Check if related schemas work', () => {

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

  it('should handle self circular association', () => {
    expect(Tabbouleh.generateJSONSchema(CircularAssociationSample)).toEqual(
      schemaCircularAssociation
    );
  });
});
