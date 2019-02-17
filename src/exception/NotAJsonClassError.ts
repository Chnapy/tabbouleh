import { ClassLike } from '../types/ClassTypes';

export default class NotAJsonClassError extends Error {
  constructor(target: ClassLike) {
    super('Class called by Tabbouleh but not annotate with @JSONClass: ' + target.name);
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, NotAJsonClassError.prototype);
  }
}
