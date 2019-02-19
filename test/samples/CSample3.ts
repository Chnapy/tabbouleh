import JSONProperty from '../../src/annotation/JSONProperty';
import { JSONEntityInteger, JSONEntityString } from '../../src/types/JSONTypes';

export default class CSample3 {

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
