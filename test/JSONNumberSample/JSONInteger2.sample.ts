import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONInteger } from '../../src/decorators/JSONInteger';

@JSONSchema
export class JSONInteger2Sample {
  @JSONInteger
  prop: string;
}
