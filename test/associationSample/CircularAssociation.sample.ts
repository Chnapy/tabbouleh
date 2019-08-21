import {JSONSchema} from '../../src/decorators/JSONSchema';
import {JSONObject} from '../../src/decorators/JSONObject';

@JSONSchema
export class CircularAssociationSample {

  @JSONObject
  value: object;

  @JSONObject(() => CircularAssociationSample)
  inception: CircularAssociationSample;
}
