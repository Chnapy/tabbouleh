import {JSONSchema} from '../../src/decorators/JSONSchema';
import {JSONObject} from '../../src/decorators/JSONObject';

@JSONSchema
export class CircularReferenceSample {

  @JSONObject
  value1: object;

  @JSONObject(() => CircularReferenceSample2)
  target1: CircularReferenceSample2;
}

@JSONSchema
export class CircularReferenceSample2 {

  @JSONObject
  value2: object;

  @JSONObject(() => CircularReferenceSample3)
  target2: CircularReferenceSample3;

}

@JSONSchema
export class CircularReferenceSample3 {

  @JSONObject
  value3: object;

  @JSONObject(() => CircularReferenceSample)
  target3: CircularReferenceSample;

}
