// cli base action
// @author Pluto <huarse@gmail.com>
// @create 2020/08/06 00:04

import { EventEmitter } from 'events';
import { Command } from 'commander';

export { Command };

/** 基础 Action class，所有的 fe-plugin-xxx 中的 action 必须继承此方法 */
export default abstract class Action<OptionType extends any> extends EventEmitter {
  // 由具体的继承插件去实现
  static register(program: Command) {}

  /** 当前命令的选项值，必须先在 `static register` 中调用 `program.option()` 注册才能生效 */
  options: Record<string, OptionType>;

  /** 额外参数，如 `$ fe aaa bbb ccc` 的额外参数就是 `['bbb', 'ccc']` */
  args: string[];

  constructor(program: Command) {
    super();

    // program.exitOverride();
    // try {
    //   program.parse(process.argv);
    // } catch (err) {
    //   console.error('ERROR with program.parse', err);
    //   throw err;
    // }

    program.parse(process.argv);

    this.args = program.args.slice(1);
    this.options = program.opts();
  }

  /**
   * 执行 action
   * @param config 执行 action 时传入的局部配置，在项目中即为 fe.config.js
   */
  abstract async run(config?: Record<string, any>): Promise<any>;
}
