import 'reflect-metadata';
import CSample1 from './samples/CSample1';
import Tabbouleh, { NotAJsonSchemaError } from '../src/tabbouleh';
import CSample2 from './samples/CSample2';
import CSample3 from './samples/CSample3';
import CSample4 from './samples/CSample4';
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

// TODO one file test per test
describe('Compare input <-> output', () => {
  it('generate an valid object with the good keys', () => {
    const target = {
      CSample1,
      toto: CSample2
    };

    expect(Object.keys(Tabbouleh.generateMultipleJSONSchemas(target)).sort()).toEqual(
      Object.keys(target).sort()
    );
  });

  it('class samples give the good schema', () => {
    const target = {
      CSample1,
      CSample2,
      CSample4
    };

    const listJSONEntities = Tabbouleh.generateMultipleJSONSchemas(target);

    expect(listJSONEntities).toEqual({
      CSample1: schemaCSample1,
      CSample2: schemaCSample2,
      CSample4: schemaCSample4
    });
  });

  it('class no annotate with JSONSchema throws a NotAJsonClassError', () => {
    const target = {
      CSample3
    };

    expect(() => Tabbouleh.generateMultipleJSONSchemas(target)).toThrow(NotAJsonSchemaError);
    expect(
      (() => {
        try {
          Tabbouleh.generateMultipleJSONSchemas(target);
        } catch (e) {
          return e.message.includes(target.CSample3.name);
        }
      })()
    ).toBe(true);
  });
});
