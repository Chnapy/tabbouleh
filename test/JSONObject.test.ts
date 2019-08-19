import Tabbouleh from '../src/engine/Tabbouleh';
import { JSONObject1Sample, OBJECT_SAMPLE_1_USER } from './JSONObjectSample/JSONObject1.sample';
import { JSONSchema7 } from 'json-schema';
import { FOOD_SCHEMA_PROPS } from './genericSample/Food.sample';
import { JSONObject2Sample } from './JSONObjectSample/JSONObject2.sample';
import { JSONObject3Sample } from './JSONObjectSample/JSONObject3.sample';

const schemaObjectSample1: JSONSchema7 = {
  type: 'object',

  properties: {
    user: {
      type: 'object',
      ...(OBJECT_SAMPLE_1_USER as any)
    }
  }
};

const schemaObjectSample2: JSONSchema7 = {
  type: 'object',
  properties: {
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

  it('should handle infer type', () => {
    expect(Tabbouleh.generateJSONSchema(JSONObject3Sample)).toEqual(schemaObjectSample3);
  });

  it('should handle nested object by association', () => {
    expect(Tabbouleh.generateJSONSchema(JSONObject2Sample)).toEqual(schemaObjectSample2);
  });
});
