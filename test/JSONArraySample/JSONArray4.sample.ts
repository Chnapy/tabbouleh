import { JSONSchema } from '../../src/decorators/JSONSchema';
import { FoodSample } from '../genericSample/Food.sample';
import { JSONArray } from '../../src/decorators/JSONArray';

@JSONSchema
export class JSONArray4Sample {
  @JSONArray({
    items: () => FoodSample,
    minItems: 1,
    uniqueItems: true
  })
  myArray: FoodSample[];
}
