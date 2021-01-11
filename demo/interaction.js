// inquire test
// @author CAIHUAZHI <huarse@gmail.com>
// @create 2020/07/12 18:14

'use strict';

const { utils } = require('../lib/index');

(async function() {
  const hobby = await utils.multi('请选择爱好', [
    { name: '篮球', value: 1001 },
    { name: '跑步', value: 1002 },
    { name: '睡觉', value: 1003 },
    { name: '看书', value: 1004 },
    { name: '烤肉', value: 1005 },
  ], [1002, 1004]);

  utils.print('info', '> hobby: ', hobby.join(','));

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

  const pass = await utils.password('请输入密码', null, (value) => {
    return value === '123456' ? undefined : new Error('密码错误，请重新输入！');
  });
  utils.print('info', '> password: ', pass);

  await utils.holding();

  utils.print('info', '> 继续执行...');
})();
