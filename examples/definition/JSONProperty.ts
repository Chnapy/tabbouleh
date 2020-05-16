import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONProperty } from '../../src/decorators/JSONProperty';
import { JSONEntityString } from '../../src/types/JSONTypes';

@JSONSchema
class LoginData {
  @JSONProperty
  email: string;

  @JSONProperty<JSONEntityString>({
    type: 'string',
    minLength: 6,
  })
  password: string;
}
