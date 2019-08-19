import { JSONSchema7 } from 'json-schema';
import Tabbouleh from '../src/engine/Tabbouleh';
import { JSONProperty1Sample } from './JSONPropertySample/JSONProperty1.sample';
import { JSONProperty2Sample } from './JSONPropertySample/JSONProperty2.sample';

const schemaJsonProperty1: JSONSchema7 = {
  type: 'object',
  properties: {
    prop: {
      type: 'string',
      minLength: 1
    }
  }
};

const schemaJsonProperty2: JSONSchema7 = {
  type: 'object',
  properties: {
    prop: {
      type: 'string'
    }
  }
};

describe('check JSONProperty', () => {
  it('should handle property schema', () => {
    expect(Tabbouleh.generateJSONSchema(JSONProperty1Sample)).toEqual(schemaJsonProperty1);
  });

  it('should handle infer type', () => {
    expect(Tabbouleh.generateJSONSchema(JSONProperty2Sample)).toEqual(schemaJsonProperty2);
  });
});
