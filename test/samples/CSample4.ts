import { JSONSchema } from '../../src/annotation/JSONSchema';
import { JSONRequired } from '../../src/annotation/JSONProperty';
import { JSONString } from '../../src/annotation/JSONString';
import { JSONNumber } from '../../src/annotation/JSONNumber';
import { JSONBoolean } from '../../src/annotation/JSONBoolean';

@JSONSchema
export default class CSample4 {

  @JSONString({

  })
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
