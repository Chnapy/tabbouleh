import { JSONSchema } from '../../src/decorators/JSONSchema';
import { FoodSample } from '../genericSample/Food.sample';
import { JSONObject } from '../../src/decorators/JSONObject';

@JSONSchema
export class MultipleSameAssociationSample {
  @JSONObject(() => FoodSample)
  @JSONObject(() => FoodSample)
  prop: FoodSample;
}
