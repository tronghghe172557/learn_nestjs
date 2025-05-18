// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'], // Ignore this file
  },
  // use the recommended rules from eslint and typescript-eslint
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // add 
  {
    languageOptions: {
      globals: {
        ...globals.node, // Thêm các biến global của Node.js và Jest
        ...globals.jest,
      },
      sourceType: 'commonjs', // Sử dụng CommonJS làm module type
      // install parser to Understand TS and define the root directory
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // Allow any type -> disable notification when use any
      '@typescript-eslint/no-floating-promises': 'warn', // only warn ( not error ) when use Promise that without handling
      '@typescript-eslint/no-unsafe-argument': 'warn', // only warn ( not error ) when use unsafe argument
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error', // error with variable that not used
        {
          argsIgnorePattern: '^_', // ignore variable that start with _
          varsIgnorePattern: '^_', // ignore variable (args) that start with _
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    ignores: ['.husky/install.mjs'],
    rules: {
      'no-console': [
        'error', // prohibit (cấm) console.log()
        {
          allow: ['warn', 'error'],
        },
      ],
    },
  }, // No console.log()
  {
    ignores: ['.husky/install.mjs'],
    rules: {
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
    },
  },

  // No console.log()
  {
    ignores: ['.husky/install.mjs'],
    rules: {
      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],
    },
  },

  // Only use camelCase as naming convention
  {
    rules: {
      camelcase: [
        'error',
        {
          properties: 'never',
          ignoreDestructuring: true,
          ignoreImports: true,
          ignoreGlobals: true,
        },
      ],
    },
  },

  // No default exports (i.e. export default function Foo() {})
  {
    ignores: ['*.config.*'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportDefaultDeclaration',
          message: 'Use named exports instead (i.e. export const foo = ...)',
        },
      ],
    },
  },
);
