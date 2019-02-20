import { JSONDescription, JSONEntityInteger, JSONEntityString, JSONProperty, JSONSchema } from '../../src/tabbouleh';
import { JSONTitle } from '../../src/annotation/JSONProperty';

@JSONSchema
export default class CSample1 {

  @JSONProperty<JSONEntityInteger>({
    type: 'integer',
    minimum: 0
  })
  size: number;

  @JSONProperty<JSONEntityString>({
    minLength: 6
  })
  @JSONTitle('Email')
  @JSONDescription('It\'s where you put your mail')
  email: string;

}
