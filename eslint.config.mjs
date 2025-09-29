import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  ignores: [
    '*.sh',
    '**/*.sh/**',
    'node_modules',
    '**/node_modules/**',
    'lib',
    '**/lib/**',
    '*.md',
    '**/*.md/**',
    '*.woff',
    '**/*.woff/**',
    '*.ttf',
    '**/*.ttf/**',
    '.vscode',
    '**/.vscode/**',
    '.idea',
    '**/.idea/**',
    'dist',
    'dist/**',
    'docs',
    'docs/**',
    '.local',
    '**/.local/**',
    'types/components.d.ts',
    'types/components.d.ts/**',
    'types/auto-import.d.ts',
    'types/auto-import.d.ts/**',
    'index.html',
    '**/index.html/**',
  ],
  extends: [
    '@antfu',
  ],
  rules: {
    'vue/multi-word-component-names': 'off', // 强制组件名称为多个单词
    'no-case-declarations': 'off', // 禁止在 case 或 default 子句中出现词法声明
    'jsdoc/check-param-names': 'off', // 检查 JSDoc 注释中的参数名称
    'regexp/no-unused-capturing-group': 'off', // 检查正则表达式中未使用的捕获组
    'unicorn/consistent-function-scoping': 'off', // 将箭头函数移动到外部作用域
  },
})
