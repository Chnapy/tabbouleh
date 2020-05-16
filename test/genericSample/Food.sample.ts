import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONString } from '../../src/decorators/JSONString';

export const FOOD_SCHEMA_PROPS = {
  title: 'Tabbouleh',
};

@JSONSchema<FoodSample>(FOOD_SCHEMA_PROPS)
export class FoodSample {
  @JSONString
  parsley: string;
}
