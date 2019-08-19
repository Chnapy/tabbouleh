import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONBoolean } from '../../src/decorators/JSONBoolean';

@JSONSchema
export class JSONBoolean1Sample {
  @JSONBoolean({
    default: false
  })
  prop: boolean;
}
