// shell utils
// @author MOYAN <moyan@come-future.com>
// @create 2020/09/04 00:21

import spawn from 'cross-spawn';

/** 是否有某个指令 */
export function hasCommand(cmd: string) {
  const execResult = spawn.sync('type', [cmd], { stdio: 'inherit' });
  return execResult.status === 0;
}

/**
 * 同步执行一行 shell 命令
 * @param cmd 命令字符串，例如 npm install
 */
export function execSync(cmd: string) {
  const cmdList = cmd.split(/\s{1,2}/);
  const action = cmdList.shift();
  return spawn.sync(action, cmdList, { stdio: 'inherit' });
}
