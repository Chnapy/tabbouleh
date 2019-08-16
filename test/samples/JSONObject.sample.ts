import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONObject } from '../../src/decorators/JSONObject';

export const OBJECT_SAMPLE_USER: Parameters<typeof JSONObject>[0] = {
  properties: {
    id: {
      type: 'integer'
    },
    username: {
      type: 'string'
    }
  }
};

@JSONSchema
export class JSONObjectSample {
  @JSONObject(OBJECT_SAMPLE_USER)
  user: {
    id: number;
    username: string;
  };
}
