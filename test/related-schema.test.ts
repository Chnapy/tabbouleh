import { JSONSchema7 } from 'json-schema';
import CSample5, { CS5_SCHEMA_PROPS, FOOD_SCHEMA_PROPS } from './samples/CSample5';
import Tabbouleh from '../src/engine/Tabbouleh';

const schemaCSample5: JSONSchema7 = {
  type: 'object',

  ...CS5_SCHEMA_PROPS,

  properties: {
    type: {
      type: 'string'
    },

    price: {
      type: 'number'
    },

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

describe('Check if related schemas work', () => {
  it('should handle nested object', () => {
    expect(Tabbouleh.generateJSONSchema(CSample5)).toEqual(schemaCSample5);
  });
});
