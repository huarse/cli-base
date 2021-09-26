'use strict';

const { exec, execSync } = require('../lib/utils/shell');


async function demo() {
  await exec('mkdir -p foooooo');
  await exec('mkdir -p goooooo', './foooooo');

  const result = await exec('ls -al foooooo');
  await exec('rm -rf goooooo', './foooooo');
  await exec('rm -rf foooooo');

  console.log('>>>>>>result', result);
}

async function git() {
  // execSync('git add .');
  // execSync('git commit -m "chore: auto commit"');
  execSync('fe trans "Hello World"');
}

// demo();

git();
