import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONArray } from '../../src/decorators/JSONArray';

@JSONSchema
class UserData1 {
  @JSONArray({
    items: {
      type: 'integer',
    },
  })
  childrenAges: number[];
}

@JSONSchema
class UserData2 {
  @JSONArray(() => UserData2)
  children: UserData2[];
}

@JSONSchema
class UserData3 {
  @JSONArray({
    items: () => UserData3,
    maxItems: 4,
    minItems: 0,
  })
  children: UserData3[];
}
