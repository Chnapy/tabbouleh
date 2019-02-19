import { JSONEntityInteger, JSONEntityString, JSONProperty } from '../../src/tabbouleh';

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
