import 'reflect-metadata';
import TabboulehSample1 from './TabboulehSample/TabboulehSample1';
import Tabbouleh from '../src/tabbouleh';
import TabboulehSample2 from './TabboulehSample/TabboulehSample2';
import TabboulehSample3 from './TabboulehSample/TabboulehSample3';
import { JSONSchema7 } from 'json-schema';

const schemaCSample1: JSONSchema7 = {
  type: 'object',
  properties: {
    size: {
      type: 'integer',
      minimum: 0
    },

    email: {
      type: 'string',
      title: 'Email',
      description: "It's where you put your mail",
      minLength: 6
    }
  }
};

const schemaCSample2: JSONSchema7 = {
  type: 'object',

  $id: 'http://json-schema.org/draft-07/schema#',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Toto Africa',

  required: ['phone', 'email'],

  properties: {
    name: {
      type: 'string'
    },

    phone: {
      type: 'integer',
      minimum: 10,
      maximum: 10
    },

    anotherProp: {
      type: 'null'
    },

    email: {
      type: 'string',
      minLength: 6
    }
  }
};

const schemaCSample4: JSONSchema7 = {
  type: 'object',

  required: ['lastname'],

  properties: {
    lastname: {
      type: 'string'
    },

    height: {
      type: 'number'
    },

    money: {
      type: 'number',
      minimum: 0
    },

    isAdmin: {
      type: 'boolean'
    }
  }
};

describe('check Tabbouleh generations', () => {
  it('should generate a Tabbouleh object with the good keys', () => {
    const target = {
      CSample1: TabboulehSample1,
      toto: TabboulehSample2
    };

    expect(Object.keys(Tabbouleh.generateMultipleJSONSchemas(target)).sort()).toEqual(
      Object.keys(target).sort()
    );
  });

  it('should generate a Tabbouleh object with valid JSON schemas', () => {
    const target = {
      CSample1: TabboulehSample1,
      CSample2: TabboulehSample2,
      CSample4: TabboulehSample3
    };

    const listJSONEntities = Tabbouleh.generateMultipleJSONSchemas(target);

    expect(listJSONEntities).toEqual({
      CSample1: schemaCSample1,
      CSample2: schemaCSample2,
      CSample4: schemaCSample4
    });
  });
});
