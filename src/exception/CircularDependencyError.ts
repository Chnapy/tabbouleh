import { ClassLike } from '../types/ClassTypes';

const msg = (classStack: ClassLike[]) =>
  `Circular dependency detected in the JSON Schema associations, it is not yet supported by Tabbouleh. 
  This is the path followed: ${classStack.map(c => c.name).join(' => ')}`;

/**
 * To throw when a circular dependency is detected.
 */
export class CircularDependencyError extends Error {
  /**
   * @param classStack the stack of classes followed
   */
  constructor(...classStack: ClassLike[]) {
    super(msg(classStack));
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, CircularDependencyError.prototype);
  }
}
