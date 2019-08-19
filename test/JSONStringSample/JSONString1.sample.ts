import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONString } from '../../src/decorators/JSONString';

@JSONSchema
export class JSONString1Sample {
  @JSONString({
    minLength: 1
  })
  prop: string;
}
