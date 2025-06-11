import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      'semi': ['error', 'never'],
      'max-len': ['error', { code: 120 }],
      'react/react-in-jsx-scope': 'off',
    },
    ignores: [
      'node_modules/',
      'dist/',
      '*.config.js',
    ],
  },
]
