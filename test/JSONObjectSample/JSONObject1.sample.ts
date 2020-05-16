import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONObject } from '../../src/decorators/JSONObject';

export const OBJECT_SAMPLE_1_USER: Parameters<typeof JSONObject>[0] = {
  properties: {
    id: {
      type: 'integer',
    },
    username: {
      type: 'string',
    },
  },
};

@JSONSchema
export class JSONObject1Sample {
  @JSONObject(OBJECT_SAMPLE_1_USER)
  user: {
    id: number;
    username: string;
  };
}
