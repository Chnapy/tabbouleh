import { JSONInteger, JSONProperty, JSONRequired, JSONSchema, JSONString } from '../../src/tabbouleh';

@JSONSchema({
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://json-schema.org/draft-07/schema#',
  title: 'Toto Africa'
})
export default class CSample2 {

  @JSONProperty
  name: string;

  @JSONInteger({
    minimum: 10,
    maximum: 10,
    required: true
  })
  phone: number;

  @JSONString({
    minLength: 6
  })
  @JSONRequired(true)
  email: string;

  @JSONProperty
  anotherProp: UnknownClass;

}

class UnknownClass {

}
