import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONObject } from '../../src/decorators/JSONObject';
import { FoodSample } from '../genericSample/Food.sample';

@JSONSchema
export class JSONObject3Sample {
  @JSONObject
  prop: object;
}
