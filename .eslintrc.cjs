module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: "@typescript-eslint/parser", // TypeScript 파서 추가
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
    "plugin:@typescript-eslint/recommended" // TypeScript 규칙 추가
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  settings: {
    react: {
      version: "detect"
    }
  }
}
