import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONString } from '../../src/decorators/JSONString';

@JSONSchema<LoginData>({
  required: ['email', 'password']
})
class LoginData {

  @JSONString({
    format: 'email'
  })
  email: string;

  @JSONString({
    minLength: 6
  })
  password: string;

}

