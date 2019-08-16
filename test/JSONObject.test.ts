import Tabbouleh from '../src/engine/Tabbouleh';
import { OBJECT_SAMPLE_USER, JSONObjectSample } from './samples/JSONObject.sample';
import { JSONSchema7 } from 'json-schema';

const schemaObjectSample: JSONSchema7 = {
  type: 'object',

  properties: {
    user: {
      type: 'object',
      ...(OBJECT_SAMPLE_USER as any)
    }
  }
};

describe('check JSONObject', () => {
  it('should handle JSONObject with JSONEntity given', () => {
    expect(Tabbouleh.generateJSONSchema(JSONObjectSample)).toEqual(schemaObjectSample);
  });
});
