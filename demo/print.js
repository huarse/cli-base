// print demo
// @author CAIHUAZHI <huarse@gmail.com>
// @create 2020/08/17 21:29

const path = require('path');
const { utils } = require('../lib/index');

utils.printJSON({
  aaa: 1001,
  bbb: [100, 200],
  ccc: [{ x: 555, y: 666}, { x: 777, y: 888 }],
  ddd: {
    eee: 9999,
  },
});

utils.print('debug', '我是一条debug日志', 'xxxxx')(path.resolve(__dirname, './logfile.log'));
utils.print('info', '我是一条info日志', 'xxxxx')(path.resolve(__dirname, './logfile.log'));
utils.print('success', '我是一条success日志', 'xxxxx')(path.resolve(__dirname, './logfile.log'));
utils.print('warn', '我是一条warn日志', 'xxxxx')(path.resolve(__dirname, './logfile.log'));
utils.print('error', '我是一条error日志', 'xxxxx')(path.resolve(__dirname, './logfile.log'));
