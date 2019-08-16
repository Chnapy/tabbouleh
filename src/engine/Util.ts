import { ClassLike } from '../types/ClassTypes';

export const Util = {
  isClass(o: any): o is ClassLike {
    return o && o['name'] && o['prototype'];
  }
};
