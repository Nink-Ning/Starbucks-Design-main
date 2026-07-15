---
name: starbucks-vue-internationalization
description: "Starbucks UI Vue 国际化指南。用于语言包、ConfigProvider 语言切换和支持的地区编码。"
user-invocable: false
---

# 国际化

Starbucks UI Vue 的组件内置文案通过 `<a-config-provider :locale="...">` 配置。

## 基本用法

```vue
<template>
  <a-config-provider :locale="enUS">
    <a-pagination :total="50" show-total show-jumper show-page-size />
  </a-config-provider>
</template>

<script setup lang="ts">
import enUS from '@sbux/starbucks-design-vue/es/locale/lang/en-us';
</script>
```

## 支持语言

| 语言 | 编码 |
|---|---|
| 简体中文 | zh-CN |
| 英文 | en-US |
| 日文 | ja-JP |
| 繁体中文（中国台湾） | zh-TW |
| 葡萄牙语 | pt-PT |
| 西班牙语 | es-ES |
| 印度尼西亚语 | id-ID |
| 法语 | fr-FR |
| 德语 | de-DE |
| 韩语 | ko-KR |
| 意大利语 | it-IT |
| 马来语 | ms-MY |
| 泰语 | th-TH |
| 越南语 | vi-VN |
| 高棉语 | km-KH |
| 阿拉伯语 | ar-EG |
| 俄语 | ru-RU |
| 荷兰语 | nl-NL |

## 使用建议

- 把 `<a-config-provider>` 放在所有需要本地化文案的组件之上。
- 应用自身语言状态和 Starbucks 语言对象分开维护，再把应用语言编码映射到 Starbucks locale import。
- 只有应用确实支持运行时切换语言时，才需要懒加载语言包。
