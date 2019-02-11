import DummyClass from "../src/tabbouleh"
import CSample1 from './ISample1'

/**
 * Dummy test
 */
describe("Dummy test", () => {

  new CSample1();


  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("DummyClass is instantiable", () => {
    expect(new DummyClass()).toBeInstanceOf(DummyClass)
  })
})
