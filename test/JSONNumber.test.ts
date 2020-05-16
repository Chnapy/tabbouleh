import { JSONSchema7 } from 'json-schema';
import Tabbouleh from '../src/engine/Tabbouleh';
import { JSONNumber1Sample } from './JSONNumberSample/JSONNumber1.sample';
import { JSONNumber2Sample } from './JSONNumberSample/JSONNumber2.sample';
import { JSONInteger1Sample } from './JSONNumberSample/JSONInteger1.sample';
import { JSONInteger2Sample } from './JSONNumberSample/JSONInteger2.sample';

const schemaJsonNumber1: JSONSchema7 = {
  type: 'object',
  properties: {
    prop: {
      type: 'number',
      minimum: 1,
    },
  },
};

const schemaJsonNumber2: JSONSchema7 = {
  type: 'object',
  properties: {
    prop: {
      type: 'number',
    },
  },
};

const schemaJsonInteger1: JSONSchema7 = {
  type: 'object',
  properties: {
    prop: {
      type: 'integer',
      minimum: 1,
    },
  },
};

const schemaJsonInteger2: JSONSchema7 = {
  type: 'object',
  properties: {
    prop: {
      type: 'integer',
    },
  },
};

describe('check JSONNumber', () => {
  it('should handle number schema', () => {
    expect(Tabbouleh.generateJSONSchema(JSONNumber1Sample)).toEqual(schemaJsonNumber1);
  });

  it('should handle without schema', () => {
    expect(Tabbouleh.generateJSONSchema(JSONNumber2Sample)).toEqual(schemaJsonNumber2);
  });
});

describe('check JSONInteger', () => {
  it('should handle integer schema', () => {
    expect(Tabbouleh.generateJSONSchema(JSONInteger1Sample)).toEqual(schemaJsonInteger1);
  });

  it('should handle without schema', () => {
    expect(Tabbouleh.generateJSONSchema(JSONInteger2Sample)).toEqual(schemaJsonInteger2);
  });
});
