// 测试用例
// @author Pluto <huarse@gmail.com>
// @create 2018/05/22

import * as all from '../src';

test('#all modules', () => {
  expect(Reflect.has(all, 'consts')).toBeTruthy();
  expect(Reflect.has(all, 'utils')).toBeTruthy();
  expect(Reflect.has(all, 'files')).toBeTruthy();
});

test('#util module', () => {
  expect(typeof all.utils.getProgressStr).toBe('function');
  expect(typeof all.utils.progressBar).toBe('function');
  expect(typeof all.utils.logger).toBe('function');
  expect(typeof all.utils.print).toBe('function');
  expect(typeof all.utils.printJSON).toBe('function');
  expect(typeof all.utils.sleep).toBe('function');
  expect(typeof all.utils.parseProperties).toBe('function');
  expect(typeof all.utils.parseValue).toBe('function');
  expect(typeof all.utils.templateRender).toBe('function');
  expect(typeof all.utils.confirm).toBe('function');
  expect(typeof all.utils.select).toBe('function');
  expect(typeof all.utils.check).toBe('function');
  expect(typeof all.utils.prompt).toBe('function');
  expect(typeof all.utils.input).toBe('function');
  expect(typeof all.utils.password).toBe('function');
  expect(typeof all.utils.holding).toBe('function');
  expect(typeof all.utils.waiting).toBe('function');
});

test('#const module', () => {
  expect(typeof all.consts.HOMEPATH).toBe('string');
  expect(typeof all.consts.IS_WIN).toBe('boolean');
});

test('#files module', () => {
  expect(typeof all.files.fileIterator).toBe('function');
  expect(typeof all.files.iterator).toBe('function');
  expect(typeof all.files.dirSyncIterator).toBe('function');
  expect(typeof all.files.getFileCount).toBe('function');
  expect(typeof all.files.count).toBe('function');
  expect(typeof all.files.copyDir).toBe('function');
  expect(typeof all.files.clearDir).toBe('function');
  expect(typeof all.files.search).toBe('function');
  expect(typeof all.files.findInFolder).toBe('function');
});
