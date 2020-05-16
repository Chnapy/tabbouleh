import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONString } from '../../src/decorators/JSONString';

@JSONSchema
class LoginData {
  @JSONString({
    format: 'email',
    maxLength: 64,
  })
  email: string;

  @JSONString
  password: string;
}
