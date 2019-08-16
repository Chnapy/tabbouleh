import { JSONSchema, JSONString } from '../../src/tabbouleh';
import { JSONNumber } from '../../src/decorators/JSONNumber';
import { JSONObject } from '../../src/decorators/JSONObject';
import { FoodSample } from '../genericSample/Food.sample';

export const CS5_SCHEMA_PROPS = {
  title: 'Mezze dish',
  description: 'The best lebanese mezze of the town'
};

@JSONSchema<CSample5>(CS5_SCHEMA_PROPS)
export class CSample5 {
  @JSONString
  type: string;

  @JSONNumber
  price: number;

  @JSONObject(() => FoodSample)
  food: FoodSample;
}
