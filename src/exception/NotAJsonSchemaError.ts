import { ClassLike } from '../types/ClassTypes';

const msg = (name: string) => `Class called by Tabbouleh but not annotate with @JSONSchema: ${name}`;

export default class NotAJsonSchemaError extends Error {
  constructor(target: ClassLike) {
    super(msg(target.name));
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, NotAJsonSchemaError.prototype);
  }
}
