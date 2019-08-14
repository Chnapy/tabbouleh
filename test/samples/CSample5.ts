import { JSONSchema, JSONString } from '../../src/tabbouleh';
import { JSONNumber } from '../../src/decorators/JSONNumber';
import { JSONObject } from '../../src/decorators/JSONObject';

export const CS5_SCHEMA_PROPS = {
  title: 'Mezze dish',
  description: 'The best lebanese mezze of the town'
};

export const FOOD_SCHEMA_PROPS = {
  title: 'Tabbouleh'
};

@JSONSchema<Food>(FOOD_SCHEMA_PROPS)
class Food {
  @JSONString
  parsley: string;
}

@JSONSchema<CSample5>(CS5_SCHEMA_PROPS)
export default class CSample5 {
  @JSONString
  type: string;

  @JSONNumber
  price: number;

  @JSONObject(() => Food)
  food: Food;
}
