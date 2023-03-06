module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/promise-function-async': [
      // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/promise-function-async.md
      'warn',
      {
        allowedPromiseNames: ['Thenable'],
        checkArrowFunctions: true,
        checkFunctionDeclarations: true,
        checkFunctionExpressions: true,
        checkMethodDeclarations: true,
      },
    ],
    '@typescript-eslint/explicit-member-accessibility': 'off', // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
    curly: ['error', 'all'], // https://eslint.org/docs/rules/curly
    'padding-line-between-statements': [
      // https://eslint.org/docs/rules/padding-line-between-statements#padding-line-between-statements
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'brace-style': 'off', // https://eslint.org/docs/rules/brace-style#brace-style
    '@typescript-eslint/brace-style': ['error'],
    'arrow-parens': ['warn', 'always'], // https://eslint.org/docs/rules/arrow-parens
    'no-useless-constructor': 'off', // https://eslint.org/docs/rules/no-useless-constructor#no-useless-constructor
    'no-empty-function': ['warn'], // https://eslint.org/docs/rules/no-empty-function#no-empty-function
    'no-return-await': 'warn', // https://eslint.org/docs/rules/no-return-await
    'no-await-in-loop': 'warn', // https://eslint.org/docs/rules/no-await-in-loop
    eqeqeq: 'warn', // https://eslint.org/docs/rules/eqeqeq
    '@typescript-eslint/naming-convention': [
      // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/naming-convention.md
      'warn',
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE'],
        trailingUnderscore: 'allow',
      },
      {
        selector: 'enumMember',
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'forbid',
      },
      {
        selector: 'class',
        format: ['StrictPascalCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-member-accessibility': ['warn'],
      },
    },
  ],
};
