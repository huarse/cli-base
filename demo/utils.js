// utils test
// @author CAIHUAZHI <huarse@gmail.com>
// @create 2020/07/10 10:27

const { utils, ora } = require('../lib/index');

let i = 0;
const spinner = ora(utils.getProgressStr(i, 68, '复制中...')).start();
const timmer = setInterval(() => {
  spinner.text = utils.getProgressStr(++i, 68, '复制中...');
  if (i >= 68) {
    clearInterval(timmer);
    spinner.succeed(utils.getProgressStr(++i, 68, '复制完成'));
  }
}, 50);

const tpl = `
<h1>{{title}}</h1>
<div>{{info.name}}</div>
<div>{{info.gender}}</div>
`;

console.log(utils.render(tpl, { title: 'hello', info: { name: 'zhangsan' } }));
