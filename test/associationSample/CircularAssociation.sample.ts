import {JSONSchema} from '../../src/decorators/JSONSchema';
import {JSONObject} from '../../src/decorators/JSONObject';

@JSONSchema
export class CircularAssociationSample {

  @JSONObject
  value1: object;

  @JSONObject(() => CircularAssociationSample2)
  target1: CircularAssociationSample2;
}

@JSONSchema
export class CircularAssociationSample2 {

  @JSONObject
  value2: object;

  @JSONObject(() => CircularAssociationSample3)
  target2: CircularAssociationSample3;

}

@JSONSchema
export class CircularAssociationSample3 {

  @JSONObject
  value3: object;

  @JSONObject(() => CircularAssociationSample)
  target3: CircularAssociationSample;

}
