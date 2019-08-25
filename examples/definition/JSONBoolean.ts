import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONBoolean } from '../../src/decorators/JSONBoolean';

@JSONSchema
export class UserData {

  @JSONBoolean
  active: boolean;

}
