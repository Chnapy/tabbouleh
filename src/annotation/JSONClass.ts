import 'reflect-metadata'
import { REFLECT_JSON_SCHEMA } from './ReflectKeys'
import { Optional } from '../jsonTypes/Optional'
import { JSONRoot } from '../jsonTypes/JSONTypes'

export default function JSONSchema<T extends { new (): object } & any>(
  value: Optional<JSONRoot> = {}
) {
  return (target: T) => {
    console.log('class', target)

    // const name = target.name

    const json: JSONRoot = {
      type: 'object',
      $schema: 'todo',
      ...value
    }

    Reflect.defineMetadata(REFLECT_JSON_SCHEMA, json, target)

    // Reflect.defineMetadata(REFLECT_JSON_OPTIONS, {}, target)

    console.log('class - metadata', Reflect.getMetadata(REFLECT_JSON_SCHEMA, target))
  }
}
