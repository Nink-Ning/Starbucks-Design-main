# DesignKit Starter V1 Runtime

这是 DesignKit Starter V1 的内部试用 Runtime，不是独立发布的 React 包。

## 文件

- `starbucks-react.umd.js`：由当前 React 工作区源码生成的 UMD 组件运行时。
- `starbucks-react.css`：与上述 UMD JS 同一次构建生成的完整组件样式。
- `runtime-manifest.json`：构建来源、版本、大小、hash 和验证状态。

当前构建对应 `packageVersion=1.1.22`，固定外部运行时为 React/ReactDOM `18.3.1`、Arco React/Icon `2.66.15`。当前文件 hash 以 `runtime-manifest.json` 为准：UMD `09e6d5ccc3b255d25473b8463a5e2943a6516c2fd6b1980ba3002c4e314d7bc3`，CSS `cdae16d0304a180c0c6606b3e35ce0def5487600121ac279ad7ba016e074f4ed`。

## 使用要求

Starter HTML 应先加载固定版本的 React、ReactDOM、Arco React 和 Arco Icon，再加载本目录 CSS 和 UMD JS，最后加载 Babel Standalone。

该 Runtime 依赖 Starter 的相对目录结构，不承诺将 HTML 单独复制到其他目录后仍然可用。

当前 Runtime 不包含 Pro 全量能力，仅选择性包含 Basic Form 所需的
`FormPageLayout`、`FormGrid`、`FormGridItem`、`FormControlArea`、`FormActions`，
以及 Basic Detail 所需的 `DetailPageLayout`、`DetailSection` 和
`DetailDescriptions` 及其共享布局样式。列表页继续使用 Button、Input、Select、Table、Pagination、Tag、Empty、Result 和 Message 等基础能力。

## 内部试用说明

正式版未来应切换到经过验证、版本固定且 JS/CSS 同次构建的 CDN Runtime。本目录不包含法律许可证，不替代正式发布流程。

Runtime 生成资产不可手工编辑。若需要更新，必须从当前 React 工作区源码和 Starter 专用构建配置重新生成，并同步更新 Manifest 的来源、大小和 hash。该 UMD 不是完整 public UMD，也不代表完整 Pro 包；当前只包含三个 Golden Example 实际使用的基础能力和精选 Form/Detail Pro Layout。
