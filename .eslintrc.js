module.exports = {
  env: {
    browser: true,  // Set to true for frontend code
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/all',
    'plugin:react/recommended',  // Added this line
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@babel/eslint-parser',  // Added this line
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,  // Added this line to enable JSX parsing
    },
    requireConfigFile: false,  // Added this line
  },
  plugins: ['jest', 'react'],  // Added 'react' plugin
  rules: {
    'max-classes-per-file': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'no-shadow': 'off',
    'no-restricted-syntax': [
      'error',
      'LabeledStatement',
      'WithStatement',
    ],
  },
  overrides: [
    {
      files: ['*.js'],
      excludedFiles: 'babel.config.js',
    }
  ],
  settings: {
    react: {
      version: 'detect',  // Added this line to automatically detect the React version
    },
  },
};