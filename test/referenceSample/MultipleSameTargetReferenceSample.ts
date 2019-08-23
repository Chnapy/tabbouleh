import {JSONSchema} from '../../src/decorators/JSONSchema';
import {FoodSample} from '../genericSample/Food.sample';
import {JSONObject} from '../../src/decorators/JSONObject';

@JSONSchema
export class MultipleSameTargetReferenceSample {
  @JSONObject(() => FoodSample)
  prop1: FoodSample;

  @JSONObject(() => FoodSample)
  prop2: FoodSample;
}
