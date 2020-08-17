// files.js test
// @author MOYAN <moyan@come-future.com>
// @create 2020/07/10 09:25

'use strict';

const fs = require('fs');
const { copyDir, clearDir, fileIterator, findInFolder } = require('../lib/index').files;

async function test() {
  await copyDir({
    src: './node_modules',
    dist: './xxxxxx.bak',
    exclude: null,
  });

  await clearDir({
    src: './xxxxxx.bak'
  });

  let flag = 0;
  await fileIterator('./lib', async (filePath, fileRelativePath) => {
    // console.log('file: ', flag, fileRelativePath, filePath);

    const stats = fs.statSync(filePath);
    console.log('>>>>>>>', fileRelativePath, stats.size);

    flag++;
    return await flag < 10;
  }, null, null);

  const result = await findInFolder('./lib', (filePath, fileContent) => {
    return /Pluto/.test(fileContent);
  }, {
    // all: true,
    // include: /index/,
    // exclude: /util/,
    // limit: 500,
  });

  console.log('>>>>, result', result);

}

test();
