import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONArray } from '../../src/decorators/JSONArray';

@JSONSchema
export class JSONArray1Sample {
  @JSONArray({
    items: {
      type: 'string',
      minLength: 3
    }
  })
  myArray: string[];
}
