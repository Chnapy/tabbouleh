import Tabbouleh, { NotAJsonSchemaError } from '../src/tabbouleh';
import { JSONSchema7 } from 'json-schema';
import { JSONSchema1Sample } from './JSONSchemaSample/JSONSchema1.sample';
import { NotJsonSchemaSample } from './genericSample/NotJsonSchema.sample';

const schemaJSONSchema1: JSONSchema7 = {
  type: 'object',
  properties: {}
};

describe('check JSONSchema', () => {
  it('should give a JSON schema', () => {
    expect(Tabbouleh.generateJSONSchema(JSONSchema1Sample)).toEqual(schemaJSONSchema1);
  });

  it('should throw a NotAJsonClassError on class not decorated with JSONSchema', () => {
    expect(() => Tabbouleh.generateJSONSchema(NotJsonSchemaSample)).toThrow(NotAJsonSchemaError);
  });
});
