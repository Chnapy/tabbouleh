import { JSONEntity } from './JSONTypes';

export type ClassLike<P extends { [k: string]: any } = { [k: string]: any }> = {
  new (): any;
  name: string;
  prototype: P;
};

export type ListClassEntity<C extends ClassLike> = { [k: string]: C };

export type ListJSONEntity<L> = { [k in keyof L]: JSONEntity<any, any> };
