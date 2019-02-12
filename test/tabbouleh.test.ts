import 'reflect-metadata';
import DummyClass from '../src/tabbouleh';
import { REFLECT_JSON_ATTRIBUTES, REFLECT_JSON_CLASS } from '../src/annotation/ReflectKeys';

/**
 * Dummy test
 */
describe('Dummy test', () => {

  const load = require('./CSample1');

  console.log('REQUIRE_LIST', load);

  for (const k of Object.keys(load)) {
    const value = load[k];

    if (typeof value !== 'function') {
      continue;
    }

    const metadata = Reflect.getMetadata(REFLECT_JSON_CLASS, value.prototype);

    if (!metadata) {
      continue;
    }

    const attributes = Reflect.getMetadata(REFLECT_JSON_ATTRIBUTES, value.prototype);

    console.log('KEEP', k, value, metadata, attributes);
  }


  it('works if true is truthy', () => {
    expect(true).toBeTruthy();
  });

  it('DummyClass is instantiable', () => {
    expect(new DummyClass()).toBeInstanceOf(DummyClass);
  });
});
