---
name: starbucks-vue-config-provider
description: "Starbucks UI Vue 全局配置 ConfigProvider 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-config-provider>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 全局配置 ConfigProvider

## 简介

设置国际化语言的基本用法。

## 基本用法

```vue
<template>
  <a-config-provider :locale="locale">
    <a-radio-group
      type="button"
      v-model="localeType"
      :options="localeOptions"
    ></a-radio-group>
    <div>
      <a-pagination
        :total="50"
        show-total
        show-jumper
        show-page-size
        style="margin-top: 20px; margin-bottom: 20px;"
      />
    </div>
    <a-space :size="20" style="margin-bottom: 20px;">
      <a-range-picker style="width: 300px;" />
      <a-time-picker type="time-range" style="width: 300px;" />
      <a-popconfirm content="Are you sure you want to delete?">
        <a-button type="primary">Popconfirm</a-button>
      </a-popconfirm>
    </a-space>
  </a-config-provider>
</template>

<script>
import { ref, computed } from 'vue';
import zhCN from '@sbux/starbucks-design-vue/es/locale/lang/zh-cn';
import enUS from '@sbux/starbucks-design-vue/es/locale/lang/en-us';
import esES from '@sbux/starbucks-design-vue/es/locale/lang/es-es';
import jaJP from '@sbux/starbucks-design-vue/es/locale/lang/ja-jp';
import idID from '@sbux/starbucks-design-vue/es/locale/lang/id-id';
import frFR from '@sbux/starbucks-design-vue/es/locale/lang/fr-fr';
import ptPT from '@sbux/starbucks-design-vue/es/locale/lang/pt-pt';
import deDE from '@sbux/starbucks-design-vue/es/locale/lang/de-de';
import koKR from '@sbux/starbucks-design-vue/es/locale/lang/ko-kr';
import itIT from '@sbux/starbucks-design-vue/es/locale/lang/it-it';
import thTH from '@sbux/starbucks-design-vue/es/locale/lang/th-th';
import viVN from '@sbux/starbucks-design-vue/es/locale/lang/vi-vn';
import nlNL from '@sbux/starbucks-design-vue/es/locale/lang/nl-nl';

const locales = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'es-ES': esES,
  'ja-JP': jaJP,
  'id-ID': idID,
  'fr-FR': frFR,
  'pt-PT': ptPT,
  'de-DE': deDE,
  'ko-KR': koKR,
  'it-IT': itIT,
  'th-TH': thTH,
  'vi-VN': viVN,
  'nl-NL': nlNL,
};

export default {
  setup() {
    const localeType = ref('es-ES');
    const locale = computed(() => {
      return locales[localeType.value] || zhCN;
    });

    return {
      localeType,
      locale,
      localeOptions: Object.keys(locales),
    };
  },
};
</script>
```

## API

### `<config-provider>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|prefix-cls|组件类名前缀|`string`|`'arco'`||
|locale|配置语言包|`StarbucksLang`|`-`||
|size|大小|`Size`|`-`|2.14.0|
|global|是否全局生效|`boolean`|`false`|2.25.0|
|update-at-scroll|是否在容器滚动时更新弹出框的位置|`boolean`|`false`|2.25.0|
|scroll-to-close|是否在滚动时关闭弹出框|`boolean`|`false`|2.46.0|
|exchange-time|是否交换时间|`boolean`|`true`|2.48.0|
|rtl|视图的表现形式是从右开始向左结束|`boolean`|`false`||

### `<config-provider>` 插槽

|插槽名|描述|参数|版本|
|---|:---:|---|:---|
|loading|自定义加载中元素|-|2.28.0|
|empty|自定义空状态元素|component: `string`|2.28.0|

## 常用模式

- **自定义空状态元素**：通过 `empty` 插槽可以全局自定义空状态元素。
- **RTL 视图**：设置组件为从右向左阅读的视图。

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 基础组件保持语义清晰，主操作、次操作和危险操作要用不同 `type` 或 `status` 区分。
- 图标、按钮、链接等交互元素要同时考虑禁用、加载和可访问文本。
