import {JSONInteger, JSONProperty, JSONSchema, JSONString} from '../../src/tabbouleh';

@JSONSchema<TabboulehSample2>({
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://json-schema.org/draft-07/schema#',
  title: 'Toto Africa',
  required: ['phone', 'email']
})
export default class TabboulehSample2 {
  @JSONProperty
  name: string;

  @JSONInteger({
    minimum: 10,
    maximum: 10
  })
  phone: number;

  @JSONString({
    minLength: 6
  })
  email: string;

  @JSONProperty
  anotherProp: UnknownClass;
}

class UnknownClass {}
