import { JSONInteger, JSONRequired, JSONString } from '../../src/tabbouleh';

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
