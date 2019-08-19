import { JSONSchema7 } from 'json-schema';
import { FOOD_SCHEMA_PROPS } from './genericSample/Food.sample';
import Tabbouleh from '../src/engine/Tabbouleh';
import { JSONArray1Sample } from './JSONArraySample/JSONArray1.sample';
import { JSONArray2Sample } from './JSONArraySample/JSONArray2.sample';
import { JSONArray3Sample } from './JSONArraySample/JSONArray3.sample';
import { JSONArray4Sample } from './JSONArraySample/JSONArray4.sample';

const jsonArray1SampleSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    myArray: {
      type: 'array',
      items: {
        type: 'string',
        minLength: 3
      }
    }
  }
};

const jsonArray2SampleSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    myArray: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
};

const jsonArray3SampleSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    myArray: {
      type: 'array',
      items: {
        ...FOOD_SCHEMA_PROPS,
        type: 'object',
        properties: {
          parsley: {
            type: 'string'
          }
        }
      }
    }
  }
};

const jsonArray4SampleSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    myArray: {
      type: 'array',
      items: {
        ...FOOD_SCHEMA_PROPS,
        type: 'object',
        properties: {
          parsley: {
            type: 'string'
          }
        }
      },
      minItems: 1,
      uniqueItems: true
    }
  }
};

describe('check JSONArray', () => {
  it('should handle array schema', () => {
    expect(Tabbouleh.generateJSONSchema(JSONArray1Sample)).toEqual(jsonArray1SampleSchema);
  });

  it('should handle given primary type', () => {
    expect(Tabbouleh.generateJSONSchema(JSONArray2Sample)).toEqual(jsonArray2SampleSchema);
  });

  it('should handle given object type', () => {
    expect(Tabbouleh.generateJSONSchema(JSONArray3Sample)).toEqual(jsonArray3SampleSchema);
  });

  it('should handle array schema with given object type', () => {
    expect(Tabbouleh.generateJSONSchema(JSONArray4Sample)).toEqual(jsonArray4SampleSchema);
  });
});
