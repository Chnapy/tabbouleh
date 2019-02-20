import { JSONProperty, JSONRequired, JSONSchema } from '../../src/tabbouleh';
import { JSONInteger } from '../../src/annotation/JSONInteger';
import { JSONString } from '../../src/annotation/JSONString';

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
