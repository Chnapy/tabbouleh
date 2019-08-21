import {JSONSchema7} from 'json-schema';
import Tabbouleh from '../src/engine/Tabbouleh';
import {FOOD_SCHEMA_PROPS, FoodSample} from './genericSample/Food.sample';
import {SelfCircularAssociationSample} from './associationSample/SelfCircularAssociation.sample';
import {UndefinedAssociationSample} from './associationSample/UndefinedAssociation.sample';
import {NotAJsonSchemaError} from '../src/exception/NotAJsonSchemaError';
import {NotJsonSchemaAssociationSample} from './associationSample/NotJsonSchemaAssociation.sample';
import {MultipleSameAssociationSample} from './associationSample/MultipleSameAssociation.sample';
import AssociationEngine from "../src/engine/AssociationEngine";
import {
  CircularAssociationSample,
  CircularAssociationSample2,
  CircularAssociationSample3
} from "./associationSample/CircularAssociation.sample";
import {MultipleSameTargetAssociationSample} from "./associationSample/MultipleSameTargetAssociation.sample";

const foodSampleID = AssociationEngine.generateSchemaID(FoodSample);
const circularAssociationSample2ID = AssociationEngine.generateSchemaID(CircularAssociationSample2);
const circularAssociationSample3ID = AssociationEngine.generateSchemaID(CircularAssociationSample3);

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

const schemaMultipleSameTargetAssociation: JSONSchema7 = {
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
    prop1: {
      $ref: AssociationEngine.generateRef(FoodSample)
    },
    prop2: {
      $ref: AssociationEngine.generateRef(FoodSample)
    }
  }
};

const schemaCircularAssociation: JSONSchema7 = {
  type: 'object',
  definitions: {
    [circularAssociationSample2ID]: {
      type: 'object',
      properties: {
        value2: {
          type: 'object'
        },
        target2: {
          $ref: AssociationEngine.generateRef(CircularAssociationSample3, CircularAssociationSample)
        }
      }
    },
    [circularAssociationSample3ID]: {
      type: 'object',
      properties: {
        value3: {
          type: 'object'
        },
        target3: {
          $ref: AssociationEngine.generateRef(CircularAssociationSample, CircularAssociationSample)
        }
      }
    }
  },
  properties: {
    value1: {
      type: 'object'
    },
    target1: {
      $ref: AssociationEngine.generateRef(CircularAssociationSample2, CircularAssociationSample)
    }
  }
};

const schemaSelfCircularAssociation: JSONSchema7 = {
  type: 'object',
  properties: {
    value: {
      type: 'object'
    },
    inception: {
      $ref: AssociationEngine.generateRef(SelfCircularAssociationSample, SelfCircularAssociationSample)
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

  it('should handle multiple same target association', () => {
    expect(Tabbouleh.generateJSONSchema(MultipleSameTargetAssociationSample)).toEqual(
      schemaMultipleSameTargetAssociation
    );
  });

  it('should handle circular association', () => {
    expect(Tabbouleh.generateJSONSchema(CircularAssociationSample)).toEqual(
      schemaCircularAssociation
    );
  });

  it('should handle self circular association', () => {
    expect(Tabbouleh.generateJSONSchema(SelfCircularAssociationSample)).toEqual(
      schemaSelfCircularAssociation
    );
  });
});
