// utils test
// @author CAIHUAZHI <huarse@gmail.com>
// @create 2020/07/10 10:27

const { utils } = require('../lib/index');

const { stderr: log } = require('single-line-log');

let i = 0;
const timmer = setInterval(() => {
  log(utils.getProgressStr(++i, 68, '复制中...'));
  if (i >= 68) {
    clearInterval(timmer);
    utils.print('success', '>>>>> 复制完成！！');
  }
}, 50);
