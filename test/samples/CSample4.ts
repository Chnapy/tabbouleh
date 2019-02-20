import { JSONBoolean, JSONNumber, JSONRequired, JSONSchema, JSONString } from '../../src/tabbouleh';

@JSONSchema
export default class CSample4 {

  @JSONString({})
  @JSONRequired
  lastname: string;

  @JSONNumber
  height: number;

  @JSONNumber({
    minimum: 0
  })
  money: number;

  @JSONBoolean
  isAdmin: boolean;

}
