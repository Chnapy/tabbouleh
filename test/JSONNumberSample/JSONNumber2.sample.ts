import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONNumber } from '../../src/decorators/JSONNumber';

@JSONSchema
export class JSONNumber2Sample {
  @JSONNumber
  prop: string;
}
