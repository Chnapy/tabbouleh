import {JSONSchema} from '../../src/decorators/JSONSchema';
import {JSONObject} from '../../src/decorators/JSONObject';

@JSONSchema
export class SelfCircularReferenceSample {

  @JSONObject
  value: object;

  @JSONObject(() => SelfCircularReferenceSample)
  inception: SelfCircularReferenceSample;
}
