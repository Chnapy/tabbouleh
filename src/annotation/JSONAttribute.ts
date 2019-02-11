import { REFLECT_JSON_SCHEMA } from './ReflectKeys'
import { Optional } from '../jsonTypes/Optional'
import { JSONEntity } from '../jsonTypes/JSONTypes'

export default function JSONAttribute<J extends JSONEntity<any, any>>(value: Optional<J> = {}) {

  console.log('key - attribute', value);

  return <T extends { new(): object } & any>(target: T, key: keyof T & any, descriptor?: PropertyDescriptor) => {

    const reflectJson = Reflect.getMetadata(REFLECT_JSON_SCHEMA, target, key) || {};

    const json: J = {
      type: 'any',
      ...reflectJson,
      ...value
    };

    Reflect.defineMetadata(REFLECT_JSON_SCHEMA, json, target, key);

    console.log('key - attribute - metadata', key, Reflect.getMetadata(REFLECT_JSON_SCHEMA, target, key));
  };

}
