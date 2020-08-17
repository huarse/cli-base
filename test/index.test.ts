// 测试用例
// @author Pluto <huarse@gmail.com>
// @create 2018/05/22

import Person from '../src/index';

test('1 + 1 = 2', () => {
  expect(1 + 1).toBe(2);
});

test('#Person is a class',  () => {
  expect(typeof Person).toBe('function');
});

test('#Person prototypes', () => {
  const p = new Person({ name: 'zhangsan' });
  expect(p.getName()).toBe('zhangsan');
});
