// print demo
// @author CAIHUAZHI <huarse@gmail.com>
// @create 2020/08/17 21:29

const { utils } = require('../lib/index');

utils.printJSON1({
  aaa: 1001,
  bbb: [100, 200],
  ccc: [{ x: 555, y: 666}, { x: 777, y: 888 }],
  ddd: {
    eee: 9999,
  },
});
