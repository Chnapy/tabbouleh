import { Class } from '../types/ClassTypes';

export const Util = {
  isClass(o: any): o is Class {
    return o && o['name'] && o['prototype'];
  },
};
