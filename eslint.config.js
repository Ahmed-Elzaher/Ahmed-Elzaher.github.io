import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules/', 'vendor/', 'three.min.js'] },
  js.configs.recommended,
  {
    files: ['js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      // THREE comes from the self-hosted classic script (vendor/three.min.js).
      globals: { ...globals.browser, THREE: 'readonly' },
    },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-empty': ['error', { allowEmptyCatch: false }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-shadow': 'error',
      'no-param-reassign': 'error',
      'no-console': ['warn', { allow: ['error', 'warn'] }],
      'max-params': ['warn', 3],
      'max-lines-per-function': ['warn', { max: 40, skipBlankLines: true, skipComments: true }],
      complexity: ['warn', 10],
    },
  },
];
