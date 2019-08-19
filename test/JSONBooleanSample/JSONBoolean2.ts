import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONBoolean } from '../../src/decorators/JSONBoolean';

@JSONSchema
export class JSONBoolean2Sample {
  @JSONBoolean
  prop: boolean;
}
