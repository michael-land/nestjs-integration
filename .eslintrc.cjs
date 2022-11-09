module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:node/recommended',
  ],
  settings: {
    node: {
      allowModules: [],
      resolvePaths: [__dirname],
      tryExtensions: ['.js', '.json', '.node', '.ts'],
    },
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
    'node/no-missing-import': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  overrides: [],
};
