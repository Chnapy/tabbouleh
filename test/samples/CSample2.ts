import JSONSchema from '../../src/annotation/JSONSchema';
import JSONProperty from '../../src/annotation/JSONProperty';
import { JSONEntityInteger } from '../../src/types/JSONTypes';

@JSONSchema({
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://json-schema.org/draft-07/schema#',
  title: 'Toto Africa'
})
export default class CSample2 {

  @JSONProperty()
  name: string;

  @JSONProperty<JSONEntityInteger>({
    type: 'integer',
    minimum: 10,
    maximum: 10,
    required: true
  })
  phone: number;

  @JSONProperty()
  anotherProp: UnknownClass;

}

class UnknownClass {

}
