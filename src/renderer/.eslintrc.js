module.exports = {
  env: {
    browser: true,
    node: false,
  },
  globals: {
    module: true,
  },
  overrides: [
    {
      files: ['*.test.js'],
      env: {
        jest: true
      },
      globals: {
        global: true,
      }
    }
  ],
  extends: [
    'plugin:react/recommended',
  ],
  settings: {
    react: {
      version: '16.4',
    }
  }
};
