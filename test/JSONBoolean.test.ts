import { JSONSchema7 } from 'json-schema';
import Tabbouleh from '../src/engine/Tabbouleh';
import { JSONBoolean2Sample } from './JSONBooleanSample/JSONBoolean2';
import { JSONBoolean1Sample } from './JSONBooleanSample/JSONBoolean1';

const schemaJsonBoolean1: JSONSchema7 = {
  type: 'object',
  properties: {
    prop: {
      type: 'boolean',
      default: false,
    },
  },
};

const schemaJsonBoolean2: JSONSchema7 = {
  type: 'object',
  properties: {
    prop: {
      type: 'boolean',
    },
  },
};

describe('check JSONBoolean', () => {
  it('should handle boolean schema', () => {
    expect(Tabbouleh.generateJSONSchema(JSONBoolean1Sample)).toEqual(schemaJsonBoolean1);
  });

  it('should handle without schema', () => {
    expect(Tabbouleh.generateJSONSchema(JSONBoolean2Sample)).toEqual(schemaJsonBoolean2);
  });
});
