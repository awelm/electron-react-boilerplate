const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const compatPlugin = require('eslint-plugin-compat');
const importPlugin = require('eslint-plugin-import-x');
const jestPlugin = require('eslint-plugin-jest');
const promisePlugin = require('eslint-plugin-promise');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const globals = require('globals');

const sourceFiles = ['**/*.{js,jsx,ts,tsx}'];
const testFiles = [
  '**/__tests__/**/*.{js,jsx,ts,tsx}',
  '**/*.{test,spec}.{js,jsx,ts,tsx}',
];

module.exports = [
  {
    ignores: [
      '**/node_modules/**',
      '**/.git/**',
      'logs/**',
      '*.log',
      'pids/**',
      '*.pid',
      '*.seed',
      'eslint.config.cjs',
      'coverage/**',
      '.eslintcache',
      '.DS_Store',
      'release/app/dist/**',
      'release/build/**',
      '.erb/dll/**',
      '.idea/**',
      'npm-debug.log.*',
      '*.css.d.ts',
      '*.sass.d.ts',
      '*.scss.d.ts',
    ],
  },
  js.configs.recommended,
  ...tsPlugin.configs['flat/recommended'],
  reactHooksPlugin.configs.flat.recommended,
  promisePlugin.configs['flat/recommended'],
  compatPlugin.configs['flat/recommended'],
  {
    files: sourceFiles,
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
      'import-x': importPlugin,
    },
    settings: {
      'import-x/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src/'],
        },
      },
      'import-x/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'import-x/extensions': 'off',
      'import-x/no-extraneous-dependencies': 'off',
      'import-x/no-import-module-exports': 'off',
      'import-x/no-unresolved': 'off',
      'no-param-reassign': ['error', { props: false }],
      'no-shadow': 'off',
      'no-unused-vars': 'off',
    },
  },
  {
    files: testFiles,
    ...jestPlugin.configs['flat/recommended'],
    languageOptions: {
      globals: globals.jest,
    },
  },
];
