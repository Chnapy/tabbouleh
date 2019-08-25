import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONNumber } from '../../src/decorators/JSONNumber';
import { JSONInteger } from '../../src/decorators/JSONInteger';

@JSONSchema
export class UserData {

  @JSONInteger({
    minimum: 0
  })
  age: number;

  @JSONNumber
  percentCompleted: number;

}
