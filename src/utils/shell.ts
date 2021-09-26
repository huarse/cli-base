// shell 命令
// @author CAIHUAZHI <huarse@gmail.com>
// @create 2020/11/20 09:54

import spawn from 'cross-spawn';

/**
 * 执行 shell 命令，返回执行的输入结果
 * @param command 命令字符，例如 ls -al
 * @param cwd 执行目录（可选），默认是当前 process.cwd()
 */
export function exec(command: string | string[], cwd: string = process.cwd()) {
  const cmdList = getCmdList(command);
  const first = cmdList.shift();

  return new Promise((resolve, reject) => {
    const child = spawn.spawn(first, cmdList, {
      // stdio: 'inherit',
      cwd,
    });

    let output = '';
    child.stdout.setEncoding('utf-8');
    child.stdout.on('data', data => {
      output += data;
    });

    let errOutput = '';
    child.stderr.on('data', err => {
      errOutput += err;
    });

    child.on('close', () => {
      errOutput ? reject(errOutput) : resolve(output);
    });

    child.on('error', err => {
      reject(err);
    });

  });
}

/**
 * 同步执行 shell 命令
 * @param command 命令字符，例如 ls -al
 * @param cwd 执行目录（可选），默认是当前 process.cwd()
 */
export function execSync(command: string | string[], cwd: string = process.cwd()) {
  const cmdList = getCmdList(command);
  console.log('>>> cmdList', cmdList);


  const first = cmdList.shift();
  return spawn.sync(first, cmdList, { stdio: 'inherit', cwd });
}

function getCmdList(command: string | string[]) {
  if (typeof command === 'string') {
    const escapedStr = command.replace(/["']([^"]+)["']/, ($1, $2) => {
      // console.log('>>>>$1', $1, $2);
      return encodeURIComponent($2);
    });
    return escapedStr.split(' ').map(n => decodeURIComponent(n));
  }
  if (Array.isArray(command)) {
    return [...command];
  }
}
