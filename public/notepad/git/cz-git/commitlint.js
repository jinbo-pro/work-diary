/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixsSelect: '选择关联issue前缀（可选）:',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?'
    },
    types: [
      { value: 'feat', name: 'feat:     ✨ 新增功能', emoji: ':sparkles:' },
      { value: 'fix', name: 'fix:      🐛 修复缺陷', emoji: ':bug:' },
      { value: 'docs', name: 'docs:     📝 文档更新', emoji: ':memo:' },
      { value: 'style', name: 'style:    💄 代码格式', emoji: ':lipstick:' },
      {
        value: 'refactor',
        name: 'refactor: ♻️ 代码重构',
        emoji: ':recycle:'
      },
      { value: 'perf', name: 'perf:     ⚡️ 性能提升', emoji: ':zap:' },
      {
        value: 'test',
        name: 'test:     ✅ 测试相关',
        emoji: ':white_check_mark:'
      },
      {
        value: 'build',
        name: 'build:    🏗️ 构建相关',
        emoji: ':building_construction:'
      },
      { value: 'ci', name: 'ci:       💚 持续集成', emoji: ':green_heart:' },
      { value: 'chore', name: 'chore:    🔨 其他修改', emoji: ':hammer:' },
      { value: 'revert', name: 'revert:   ⏪️ 回退代码', emoji: ':rewind:' }
    ],
    useEmoji: false,
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixs: [],
    customIssuePrefixsAlign: 'top',
    emptyIssuePrefixsAlias: 'skip',
    customIssuePrefixsAlias: 'custom',
    allowCustomIssuePrefixs: true,
    allowEmptyIssuePrefixs: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: ''
  }
}
