import {
  JSONDescription,
  JSONEntityInteger,
  JSONEntityString,
  JSONProperty,
  JSONSchema,
  JSONTitle
} from '../../src/tabbouleh';

@JSONSchema
export default class TabboulehSample1 {

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
