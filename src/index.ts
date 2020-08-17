// cli-base
// @author Pluto <huarse@gmail.com>
// @create 2020/08/17 19:25

import { VERSION } from './const';
import { EventEmitter } from 'events';
import './global';

export interface PersonProps {
  name: string;
  [x: string]: any;
}

export default class Person extends EventEmitter {
  static version = VERSION;

  private _name: string = null;

  constructor(props: PersonProps = {} as PersonProps) {
    super();

    this._name = props.name;
  }

  getName(): string {
    return this._name;
  }

  async work(): Promise<number> {
    return await Promise.resolve(1);
  }
}
