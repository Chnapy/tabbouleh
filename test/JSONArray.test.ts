import { JSONSchema7 } from 'json-schema';
import { FOOD_SCHEMA_PROPS, FoodSample } from './genericSample/Food.sample';
import Tabbouleh from '../src/engine/Tabbouleh';
import { JSONArray1Sample } from './JSONArraySample/JSONArray1.sample';
import { JSONArray2Sample } from './JSONArraySample/JSONArray2.sample';
import { JSONArray3Sample } from './JSONArraySample/JSONArray3.sample';
import { JSONArray4Sample } from './JSONArraySample/JSONArray4.sample';
import ReferenceEngine from '../src/engine/ReferenceEngine';

const foodSampleID = ReferenceEngine.generateSchemaID(FoodSample);

const schemaJsonArray1: JSONSchema7 = {
  type: 'object',
  properties: {
    myArray: {
      type: 'array',
      items: {
        type: 'string',
        minLength: 3,
      },
    },
  },
};

const schemaJsonArray2: JSONSchema7 = {
  type: 'object',
  properties: {
    myArray: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
};

const schemaJsonArray3: JSONSchema7 = {
  type: 'object',
  definitions: {
    [foodSampleID]: {
      type: 'object',

      ...FOOD_SCHEMA_PROPS,

      properties: {
        parsley: {
          type: 'string',
        },
      },
    },
  },
  properties: {
    myArray: {
      type: 'array',
      items: {
        $ref: ReferenceEngine.generateRef(FoodSample),
      },
    },
  },
};

const schemaJsonArray4: JSONSchema7 = {
  type: 'object',
  definitions: {
    [foodSampleID]: {
      type: 'object',

      ...FOOD_SCHEMA_PROPS,

      properties: {
        parsley: {
          type: 'string',
        },
      },
    },
  },
  properties: {
    myArray: {
      type: 'array',
      items: {
        $ref: ReferenceEngine.generateRef(FoodSample),
      },
      minItems: 1,
      uniqueItems: true,
    },
  },
};

describe('check JSONArray', () => {
  it('should handle array schema', () => {
    expect(Tabbouleh.generateJSONSchema(JSONArray1Sample)).toEqual(schemaJsonArray1);
  });

  it('should handle given primary type', () => {
    expect(Tabbouleh.generateJSONSchema(JSONArray2Sample)).toEqual(schemaJsonArray2);
  });

  it('should handle given object type', () => {
    expect(Tabbouleh.generateJSONSchema(JSONArray3Sample)).toEqual(schemaJsonArray3);
  });

  it('should handle array schema with given object type', () => {
    expect(Tabbouleh.generateJSONSchema(JSONArray4Sample)).toEqual(schemaJsonArray4);
  });
});
