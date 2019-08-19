import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONString } from '../../src/decorators/JSONString';

@JSONSchema
export class JSONString2Sample {
  @JSONString
  prop: string;
}
