import { ClassLike } from '../types/ClassTypes';

const msg = (name: string) => `Class called by Tabbouleh but not annotate with @JSONClass: ${name}`;

export default class NotAJsonClassError extends Error {

  constructor(target: ClassLike) {
    super(msg(target.name));
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, NotAJsonClassError.prototype);
  }

}
