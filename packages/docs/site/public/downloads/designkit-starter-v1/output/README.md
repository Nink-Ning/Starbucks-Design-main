# 输出目录

AI 生成的单文件 HTML 放在这里，例如：

```text
output/store-list.html
output/store-form.html
output/store-detail.html
```

`examples/` 是只读参考用的 Golden Example；AI 生成结果必须写入 `output/`，不要覆盖 `examples/`。

生成文件应满足：

- 完整单文件 HTML；
- 固定 CDN；
- 本地 Mock 数据；
- 通过本地 HTTP 服务用 Chrome 或 Edge 预览；
- 不需要 Node.js、npm 或构建工具。

不要修改 `runtime/`、`templates/` 或 `examples/`。生成完成后使用 `START-HERE.md` 中的本地 HTTP 预览方式检查 `output/demo.html`。
