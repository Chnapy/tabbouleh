import { JSONString } from '../../src/decorators/JSONString';
import { JSONSchema } from '../../src/decorators/JSONSchema';

@JSONSchema<LoginData>({
  $id: 'https://example.com/login.json',
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Login data',
  description: 'Data required form user login',
  required: ['email', 'password'],
})
class LoginData {
  @JSONString
  email: string;

  @JSONString
  password: string;
}
