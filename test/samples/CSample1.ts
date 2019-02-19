import { JSONEntityInteger, JSONEntityString, JSONProperty, JSONSchema } from '../../src/tabbouleh';

@JSONSchema()
export default class CSample1 {

  @JSONProperty<JSONEntityInteger>({
    type: 'integer',
    minimum: 0
  })
  size: number;

  @JSONProperty<JSONEntityString>({
    minLength: 6
  })
  email: string;

}
