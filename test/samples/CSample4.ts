import { JSONBoolean, JSONNumber, JSONSchema, JSONString } from '../../src/tabbouleh';

@JSONSchema<CSample4>({
  required: ['lastname']
})
export default class CSample4 {
  @JSONString({})
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
