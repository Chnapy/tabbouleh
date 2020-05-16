import { JSONSchema7 } from 'json-schema';
import Tabbouleh from '../src/engine/Tabbouleh';
import { JSONString2Sample } from './JSONStringSample/JSONString2.sample';
import { JSONString1Sample } from './JSONStringSample/JSONString1.sample';

const schemaJsonString1: JSONSchema7 = {
  type: 'object',
  properties: {
    prop: {
      type: 'string',
      minLength: 1,
    },
  },
};

const schemaJsonString2: JSONSchema7 = {
  type: 'object',
  properties: {
    prop: {
      type: 'string',
    },
  },
};

describe('check JSONString', () => {
  it('should handle string schema', () => {
    expect(Tabbouleh.generateJSONSchema(JSONString1Sample)).toEqual(schemaJsonString1);
  });

  it('should handle without schema', () => {
    expect(Tabbouleh.generateJSONSchema(JSONString2Sample)).toEqual(schemaJsonString2);
  });
});
