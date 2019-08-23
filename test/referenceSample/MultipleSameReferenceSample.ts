import { JSONSchema } from '../../src/decorators/JSONSchema';
import { FoodSample } from '../genericSample/Food.sample';
import { JSONObject } from '../../src/decorators/JSONObject';

@JSONSchema
export class MultipleSameReferenceSample {
  @JSONObject(() => FoodSample)
  @JSONObject(() => FoodSample)
  prop: FoodSample;
}
