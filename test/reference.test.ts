import {JSONSchema7} from 'json-schema';
import Tabbouleh from '../src/engine/Tabbouleh';
import {FOOD_SCHEMA_PROPS, FoodSample} from './genericSample/Food.sample';
import {SelfCircularReferenceSample} from './referenceSample/SelfCircularReferenceSample';
import {UndefinedReferenceSample} from './referenceSample/UndefinedReferenceSample';
import {NotAJsonSchemaError} from '../src/exception/NotAJsonSchemaError';
import {NotJsonSchemaReferenceSample} from './referenceSample/NotJsonSchemaReferenceSample';
import {MultipleSameReferenceSample} from './referenceSample/MultipleSameReferenceSample';
import ReferenceEngine from "../src/engine/ReferenceEngine";
import {
  CircularReferenceSample,
  CircularReferenceSample2,
  CircularReferenceSample3
} from "./referenceSample/CircularReferenceSample";
import {MultipleSameTargetReferenceSample} from "./referenceSample/MultipleSameTargetReferenceSample";

const foodSampleID = ReferenceEngine.generateSchemaID(FoodSample);
const circularReferenceSample2ID = ReferenceEngine.generateSchemaID(CircularReferenceSample2);
const circularReferenceSample3ID = ReferenceEngine.generateSchemaID(CircularReferenceSample3);

const schemaMultipleSameReference: JSONSchema7 = {
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
      $ref: ReferenceEngine.generateRef(FoodSample)
    }
  }
};

const schemaMultipleSameTargetReference: JSONSchema7 = {
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
      $ref: ReferenceEngine.generateRef(FoodSample)
    },
    prop2: {
      $ref: ReferenceEngine.generateRef(FoodSample)
    }
  }
};

const schemaCircularReference: JSONSchema7 = {
  type: 'object',
  definitions: {
    [circularReferenceSample2ID]: {
      type: 'object',
      properties: {
        value2: {
          type: 'object'
        },
        target2: {
          $ref: ReferenceEngine.generateRef(CircularReferenceSample3, CircularReferenceSample)
        }
      }
    },
    [circularReferenceSample3ID]: {
      type: 'object',
      properties: {
        value3: {
          type: 'object'
        },
        target3: {
          $ref: ReferenceEngine.generateRef(CircularReferenceSample, CircularReferenceSample)
        }
      }
    }
  },
  properties: {
    value1: {
      type: 'object'
    },
    target1: {
      $ref: ReferenceEngine.generateRef(CircularReferenceSample2, CircularReferenceSample)
    }
  }
};

const schemaSelfCircularReference: JSONSchema7 = {
  type: 'object',
  properties: {
    value: {
      type: 'object'
    },
    inception: {
      $ref: ReferenceEngine.generateRef(SelfCircularReferenceSample, SelfCircularReferenceSample)
    }
  }
};

describe('Check if related schemas work', () => {

  it('should throw a NotAJsonSchemaError on undefined reference', () => {
    expect(() => Tabbouleh.generateJSONSchema(UndefinedReferenceSample)).toThrow(
      NotAJsonSchemaError
    );
  });

  it('should throw a NotAJsonSchemaError on no-json-schema reference', () => {
    expect(() => Tabbouleh.generateJSONSchema(NotJsonSchemaReferenceSample)).toThrow(
      NotAJsonSchemaError
    );
  });

  it('should handle multiple same reference', () => {
    expect(Tabbouleh.generateJSONSchema(MultipleSameReferenceSample)).toEqual(
      schemaMultipleSameReference
    );
  });

  it('should handle multiple same target reference', () => {
    expect(Tabbouleh.generateJSONSchema(MultipleSameTargetReferenceSample)).toEqual(
      schemaMultipleSameTargetReference
    );
  });

  it('should handle circular reference', () => {
    expect(Tabbouleh.generateJSONSchema(CircularReferenceSample)).toEqual(
      schemaCircularReference
    );
  });

  it('should handle self circular reference', () => {
    expect(Tabbouleh.generateJSONSchema(SelfCircularReferenceSample)).toEqual(
      schemaSelfCircularReference
    );
  });
});
