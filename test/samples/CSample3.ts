import { JSONRequired } from '../../src/tabbouleh';
import { JSONInteger } from '../../src/annotation/JSONInteger';
import { JSONString } from '../../src/annotation/JSONString';

export default class CSample3 {

  @JSONInteger({
    minimum: 0
  })
  size: number;

  @JSONString({
    minLength: 6
  })
  @JSONRequired(true)
  email: string;

}
