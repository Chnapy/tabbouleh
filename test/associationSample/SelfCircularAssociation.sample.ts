import {JSONSchema} from '../../src/decorators/JSONSchema';
import {JSONObject} from '../../src/decorators/JSONObject';

@JSONSchema
export class SelfCircularAssociationSample {

  @JSONObject
  value: object;

  @JSONObject(() => SelfCircularAssociationSample)
  inception: SelfCircularAssociationSample;
}
