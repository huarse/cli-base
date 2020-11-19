// inquire test
// @author MOYAN <moyan@come-future.com>
// @create 2020/07/12 18:14

'use strict';

const { utils } = require('../lib/index');

(async function() {
  const name = await utils.input('请输入用户名: ', null, value => {
    // return value === 'moyan';
    // if (value !== 'moyan') {
    //   return new Error('不能是其他人！');
    // }
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(value === 'moyan' ? true : new Error('不能是其他人呀！'));
      }, 500);
    });
  });
  utils.print('info', '> name: ', name);

  const pass = await utils.password('请输入密码', null, true);
  utils.print('info', '> password: ', pass);

  await utils.holding();

  utils.print('info', '> 继续执行...');
})();
