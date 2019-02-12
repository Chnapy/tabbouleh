import JSONClass from '../src/annotation/JSONClass';
import JSONAttribute from '../src/annotation/JSONAttribute';
import { JSONEntityInteger, JSONEntityString } from '../src/jsonTypes/JSONTypes';

@JSONClass()
export default class CSample1 {

  @JSONAttribute<JSONEntityInteger>({
    type: 'integer',
    minimum: 0
  })
  size: number;

  @JSONAttribute<JSONEntityString>({
    minLength: 6
  })
  email: string;

}

export class ShouldNotBeUse {

}

export const ShouldNotBeUseToo = 8;
