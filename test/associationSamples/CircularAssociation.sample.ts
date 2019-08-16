import { JSONSchema } from '../../src/decorators/JSONSchema';
import { JSONObject } from '../../src/decorators/JSONObject';

@JSONSchema
export class CircularAssociationSample {
  @JSONObject(() => CircularAssociationSample)
  inception: CircularAssociationSample;
}
