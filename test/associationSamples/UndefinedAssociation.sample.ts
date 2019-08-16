import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONObject } from '../../src/decorators/JSONObject';

@JSONSchema
export class UndefinedAssociationSample {
  @JSONObject(() => undefined as any)
  fake: unknown;
}
