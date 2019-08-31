import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONObject } from '../../src/decorators/JSONObject';
import { JSONString } from '../../src/decorators/JSONString';

@JSONSchema
class UserData1 {

  @JSONObject(() => UserAddress)
  address: UserAddress;

}

@JSONSchema
class UserData2 {

  @JSONObject
  address: object;

}

@JSONSchema
class UserData3 {

  @JSONObject({
    properties: {
      street: {
        type: 'string'
      },
      city: {
        type: 'string'
      }
    }
  })
  address: object;

}

@JSONSchema
class UserAddress {

  @JSONString
  street: string;

  @JSONString
  city: string;

}
