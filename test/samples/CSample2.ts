import JSONClass from '../../src/annotation/JSONClass';
import JSONAttribute from '../../src/annotation/JSONAttribute';
import { JSONEntityInteger } from '../../src/types/JSONTypes';

@JSONClass({
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://json-schema.org/draft-07/schema#',
  title: 'Toto Africa'
})
export default class CSample2 {
  @JSONAttribute()
  name: string;

  @JSONAttribute<JSONEntityInteger>({
    type: 'integer',
    minimum: 10,
    maximum: 10,
    required: true
  })
  phone: number;
}
