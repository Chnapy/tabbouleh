import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONNumber } from '../../src/decorators/JSONNumber';

@JSONSchema
export class JSONNumber1Sample {
  @JSONNumber({
    minimum: 1,
  })
  prop: number;
}
