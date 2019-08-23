import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONObject } from '../../src/decorators/JSONObject';

@JSONSchema
export class UndefinedReferenceSample {
  @JSONObject(() => undefined as any)
  fake: unknown;
}
