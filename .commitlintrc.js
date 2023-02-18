// commitlint config
// @AUTHOR CAIHUAZHI <huarse@gmail.com>
// @see https://commitlint.js.org/
// @require @commitlint/cli, @commitlint/config-conventional, husky

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-min-length': [2, 'always', 10],
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'break', 'chore']],
  },
};
