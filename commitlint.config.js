module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // new feature
        'fix', // bug fix
        'chore', // setup/config
        'docs', // documentation
        'style', // formatting (no logic change)
        'refactor', // code improvement
        'test', // tests
        'perf', // performance
        'ci', // CI/CD
        'revert', // revert commit
      ],
    ],
  },
};
