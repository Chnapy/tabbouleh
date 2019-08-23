import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONObject } from '../../src/decorators/JSONObject';
import { NotJsonSchemaSample } from '../genericSample/NotJsonSchema.sample';

@JSONSchema
export class NotJsonSchemaReferenceSample {
  @JSONObject(() => NotJsonSchemaSample)
  fake: unknown;
}
