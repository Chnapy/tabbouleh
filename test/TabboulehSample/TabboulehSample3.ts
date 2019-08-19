import {JSONBoolean, JSONNumber, JSONSchema, JSONString} from '../../src/tabbouleh';

@JSONSchema<TabboulehSample3>({
  required: ['lastname']
})
export default class TabboulehSample3 {
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
