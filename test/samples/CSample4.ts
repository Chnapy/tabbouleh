import {JSONSchema} from "../../src/annotation/JSONSchema";
import {JSONRequired} from "../../src/annotation/JSONProperty";

@JSONSchema()
export default class CSample4 {

  @JSONRequired
  lastname: string;

}
