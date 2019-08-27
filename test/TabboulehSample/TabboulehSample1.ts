import { JSONEntityInteger, JSONEntityString, JSONProperty, JSONSchema } from '../../src/tabbouleh';

@JSONSchema
export default class TabboulehSample1 {

  @JSONProperty<JSONEntityInteger>({
    type: 'integer',
    minimum: 0
  })
  size: number;

  @JSONProperty<JSONEntityString>({
    title: 'Email',
    description: 'It\'s where you put your mail',
    minLength: 6
  })
  email: string;

}
