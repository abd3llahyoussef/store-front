module.exports = {
    env: {
      es2021: true,
      node: true ,
        jasmine: true
    },
   extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier',"plugin:jasmine/recommended"],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 13,
      sourceType: 'module'
    },
   plugins: ['@typescript-eslint', 'prettier',"jasmine"],
    rules: {
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/no-inferrable-types':0,
      '@typescript-eslint/ban-types':0,
      '@typescript-eslint/no-unused-vars':0,
      'jasmine/new-line-before-expect':0,
      'jasmine/expect-matcher':0,
      'jasmine/new-line-between-declarations':0,
    'prefer-const': 'error'
    }
  }