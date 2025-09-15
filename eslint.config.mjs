import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts'
    ],
    rules: {
      '@typescript-eslint/no-unused-vars':
        ['warn', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],
      'no-console': 'warn',
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'single'],
      'jsx-quotes': ['warn', 'prefer-single'],
      'object-curly-spacing': ['warn', 'always'],
      'no-multiple-empty-lines': ['warn', { 'max': 1 }],
      'padded-blocks': ['warn', 'never'],
      'no-trailing-spaces': 'warn',
      'comma-dangle': ['warn', 'never'],
      'react/jsx-indent': ['warn', 2],
      'import/order': [
        'warn',
        {
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          'alphabetize': { 'order': 'asc', 'caseInsensitive': true }
        }
      ]
    }
  }
];

export default eslintConfig;
