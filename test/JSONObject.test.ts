import Tabbouleh from '../src/engine/Tabbouleh';
import { JSONObject1Sample, OBJECT_SAMPLE_1_USER } from './JSONObjectSample/JSONObject1.sample';
import { JSONSchema7 } from 'json-schema';
import {FOOD_SCHEMA_PROPS, FoodSample} from './genericSample/Food.sample';
import { JSONObject2Sample } from './JSONObjectSample/JSONObject2.sample';
import { JSONObject3Sample } from './JSONObjectSample/JSONObject3.sample';
import ReferenceEngine from "../src/engine/ReferenceEngine";

const schemaObjectSample1: JSONSchema7 = {
  type: 'object',

  properties: {
    user: {
      type: 'object',
      ...(OBJECT_SAMPLE_1_USER as any)
    }
  }
};

const foodSampleID = ReferenceEngine.generateSchemaID(FoodSample);
const schemaObjectSample2: JSONSchema7 = {
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
    food: {
      $ref: ReferenceEngine.generateRef(FoodSample)
    }
  }
};

const schemaObjectSample3: JSONSchema7 = {
  type: 'object',
  properties: {
    prop: {
      type: 'object'
    }
  }
};

describe('check JSONObject', () => {
  it('should handle object schema', () => {
    expect(Tabbouleh.generateJSONSchema(JSONObject1Sample)).toEqual(schemaObjectSample1);
  });

  it('should handle without schema', () => {
    expect(Tabbouleh.generateJSONSchema(JSONObject3Sample)).toEqual(schemaObjectSample3);
  });

  it('should handle nested object by reference', () => {
    expect(Tabbouleh.generateJSONSchema(JSONObject2Sample)).toEqual(schemaObjectSample2);
  });
});
