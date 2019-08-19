import { JSONSchema } from '../../src/decorators/JSONSchema';
import { FoodSample } from '../genericSample/Food.sample';
import { JSONArray } from '../../src/decorators/JSONArray';

@JSONSchema
export class JSONArray3Sample {
  @JSONArray(() => FoodSample)
  myArray: FoodSample[];
}
