import 'reflect-metadata';
import CSample1 from './samples/CSample1';
import Tabbouleh from '../src/tabbouleh';
import CSample2 from './samples/CSample2';
import { JSONEntityObject, JSONRoot } from '../src/types/JSONTypes';
import CSample3 from './samples/CSample3';
import NotAJsonClassError from '../src/exception/NotAJsonClassError';

const schemaCSample1: JSONEntityObject<typeof CSample1.prototype> = {
  type: 'object',
  properties: {
    size: {
      type: 'integer',
      minimum: 0
    },

    email: {
      type: 'string',
      minLength: 6
    }
  }
};

const schemaCSample2: JSONRoot<typeof CSample2.prototype> = {
  type: 'object',

  $id: 'http://json-schema.org/draft-07/schema#',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Toto Africa',

  properties: {
    name: {
      type: 'string'
    },

    phone: {
      type: 'integer',
      minimum: 10,
      maximum: 10,
      required: true
    }
  }
};

describe('Compare input <-> output', () => {
  it('generate an valid object with the good keys', () => {
    const target = {
      CSample1,
      toto: CSample2
    };

    const listJSONEntities = Tabbouleh.generateJSONSchemas(target);

    expect(Object.keys(listJSONEntities).sort()).toEqual(Object.keys(target).sort());
  });

  it('class samples give the good schema', () => {
    const target = {
      CSample1,
      CSample2
    };

    const listJSONEntities = Tabbouleh.generateJSONSchemas(target);

    expect(listJSONEntities).toEqual({
      CSample1: schemaCSample1,
      CSample2: schemaCSample2
    });
  });

  it('class no annotate with JSONClass throws a NotAJsonClassError', () => {
    const target = {
      CSample3
    };

    expect(() => Tabbouleh.generateJSONSchemas(target)).toThrow(NotAJsonClassError);
  });
});
