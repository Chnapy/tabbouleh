import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONArray } from '../../src/decorators/JSONArray';

@JSONSchema
export class JSONArray2Sample {
  @JSONArray('string')
  myArray: string[];
}
