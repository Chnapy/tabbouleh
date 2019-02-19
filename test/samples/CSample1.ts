import JSONSchema from '../../src/annotation/JSONSchema';
import JSONProperty from '../../src/annotation/JSONProperty';
import { JSONEntityInteger, JSONEntityString } from '../../src/types/JSONTypes';

@JSONSchema()
export default class CSample1 {

  @JSONProperty<JSONEntityInteger>({
    type: 'integer',
    minimum: 0
  })
  size: number;

  @JSONProperty<JSONEntityString>({
    minLength: 6
  })
  email: string;

}
