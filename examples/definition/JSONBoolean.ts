import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONBoolean } from '../../src/decorators/JSONBoolean';

@JSONSchema
class UserData {

  @JSONBoolean
  active: boolean;

}
