module.exports = {
  globals: {
    JSX: true,
  },
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:jest/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jest',
  ],
  rules: {
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'max-len': [
      1,
      {
        code: 100,
      },
    ],
    'react/jsx-filename-extension': [
      2,
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    ],
    'react/destructuring-assignment': [
      'off',
      'always',
      {
        ignoreClassFields: true,
      },
    ],
  },
};
