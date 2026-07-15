# Arco Design 文档迁移设计

## 目标

从 Arco Design 官方开源 GitHub 仓库迁移完整组件文档到本项目，React 和 Vue 两个框架全覆盖。

## 数据来源

| 框架 | 仓库 | README 路径 | Demo 路径 |
|------|------|-------------|-----------|
| React | `arco-design/arco-design` | `components/<Name>/README.zh-CN.md` | `components/<Name>/__demo__/*.md` |
| Vue | `arco-design/arco-design-vue` | `packages/web-vue/components/<name>/README.zh-CN.md` | `packages/web-vue/components/<name>/__demo__/*.md` |

## 目标目录

- React: `packages/docs/react/docs/components/<category>/<name>.md`（Docusaurus，jsx live 代码块）
- Vue: `packages/docs/vue/components/<category>/<name>.md`（VitePress，vue 代码块）

## 组件分类映射

按 Arco 官方分类：通用(general)、布局(layout)、数据展示(data-display)、数据录入(data-entry)、反馈(feedback)、导航(navigation)、其他(other)

## 转换规则

1. 包名替换：`@arco-design/web-react` → `@sbux/starbucks-design-react`，`@arco-design/web-vue` → `@sbux/starbucks-design-vue`
2. 图标导入替换：`@arco-design/web-react/icon` → `@sbux/starbucks-design-react/icon`
3. React demo ` ```js` 块 → ` ```jsx live`（Docusaurus 实时渲染）
4. Vue demo 保持现有 VitePress 格式（HTML 预览 + 代码块）
5. Frontmatter: `sidebar_position: N`
6. API 表格保持 Arco 官方格式（参数名、描述、类型、默认值）
