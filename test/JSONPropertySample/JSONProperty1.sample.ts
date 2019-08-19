import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONProperty } from '../../src/decorators/JSONProperty';
import { JSONEntityString } from '../../src/types/JSONTypes';

@JSONSchema
export class JSONProperty1Sample {
  @JSONProperty<JSONEntityString>({
    minLength: 1
  })
  prop: string;
}
