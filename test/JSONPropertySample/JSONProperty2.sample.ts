import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONProperty } from '../../src/decorators/JSONProperty';
import { JSONEntityString } from '../../src/types/JSONTypes';

@JSONSchema
export class JSONProperty2Sample {
  @JSONProperty
  prop: string;
}
