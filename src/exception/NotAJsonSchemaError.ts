import { Class } from '../types/ClassTypes';

const msg = (name: string) =>
  `Class called by Tabbouleh but not decorated with @JSONSchema: ${name}`;

/**
 * To throw when an expected JSON Schema class is not (or undefined).
 */
export class NotAJsonSchemaError extends Error {
  /**
   * @param target the failing target
   */
  constructor(target: Class | unknown) {
    super(msg(target && (target as any).name ? (target as any).name : target));
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, NotAJsonSchemaError.prototype);
  }
}
