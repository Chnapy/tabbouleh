import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONInteger } from '../../src/decorators/JSONInteger';

@JSONSchema
export class JSONInteger1Sample {
  @JSONInteger({
    minimum: 1,
  })
  prop: number;
}
