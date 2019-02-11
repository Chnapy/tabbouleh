import JSONSchema from '../src/annotation/JSONSchema'
import JSONAttribute from '../src/annotation/JSONAttribute'
import { JSONEntityInteger } from '../src/jsonTypes/JSONTypes'

@JSONSchema()
export default class CSample1 {

  @JSONAttribute<JSONEntityInteger>({
    type: 'integer',
    minimum: 0
  })
  size: number;

}

