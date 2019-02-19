import JSONAttribute from '../../src/annotation/JSONAttribute';
import { JSONEntityInteger, JSONEntityString } from '../../src/types/JSONTypes';

export default class CSample3 {

  @JSONAttribute<JSONEntityInteger>({
    type: 'integer',
    minimum: 0
  })
  size: number;

  @JSONAttribute<JSONEntityString>({
    minLength: 6
  })
  email: string;

}
