---
name: starbucks-vue-form
description: "Starbucks UI Vue 表单 Form 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-form>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 表单 Form

## 简介

表单的基本用法。

## 基本用法

```vue
<template>
  <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
    <a-form-item field="name" tooltip="Please enter username" label="Username">
      <a-input
        v-model="form.name"
        placeholder="please enter your username..."
      />
    </a-form-item>
    <a-form-item field="post" label="Post">
      <a-input v-model="form.post" placeholder="please enter your post..." />
    </a-form-item>
    <a-form-item field="isRead">
      <a-checkbox v-model="form.isRead"> I have read the manual </a-checkbox>
    </a-form-item>
    <a-form-item>
      <a-button html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
  {{ form }}
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const form = reactive({
      name: '',
      post: '',
      isRead: false,
    });
    const handleSubmit = (data) => {
      console.log(data);
    };

    return {
      form,
      handleSubmit,
    };
  },
};
</script>
```

## API

### `<form>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|model **(必填)**|表单数据对象|`object`|`-`||
|layout|表单的布局方式，包括水平、垂直、多列|`'horizontal' \| 'vertical' \| 'inline'`|`'horizontal'`||
|size|表单控件的尺寸|`'mini' \| 'small' \| 'medium' \| 'large'`|`'medium'`||
|label-col-props|标签元素布局选项。参数同 `<col>` 组件一致|`object`|` span: 5, offset: 0 `||
|wrapper-col-props|表单控件布局选项。参数同 `<col>` 组件一致|`object`|` span: 19, offset: 0 `||
|label-align|标签的对齐方向|`'left' \| 'right'`|`'right'`||
|disabled|是否禁用表单|`boolean`|`-`||
|rules|表单项校验规则|`Record<string, FieldRule \| FieldRule[]>`|`-`||
|auto-label-width|是否开启自动标签宽度，仅在 `layout="horizontal"` 下生效。|`boolean`|`false`|2.13.0|
|id|表单 `id` 属性和表单控件 `id` 前缀|`string`|`-`||
|scroll-to-first-error|验证失败后滚动到第一个错误字段|`boolean`|`false`|2.51.0|

### `<form>` 事件

|事件名|描述|参数|
|---|---|---|
|submit|表单提交时触发|data: `{values: Record<string, any>; errors: Record<string, ValidatedError> \| undefined}`<br>ev: `Event`|
|submit-success|验证成功时触发|values: `Record<string, any>`<br>ev: `Event`|
|submit-failed|验证失败时触发|data: `{values: Record<string, any>; errors: Record<string, ValidatedError>}`<br>ev: `Event`|

### `<form>` 方法

|方法名|描述|参数|返回值|版本|
|---|---|---|---|:---|
|validate|校验全部表单数据|callback: `(errors: undefined \| Record<string, ValidatedError>) => void`|Promise<undefined \| Record<string, ValidatedError>>||
|validateField|校验部分表单数据|field: `string \| string[]`<br>callback: `(errors: undefined \| Record<string, ValidatedError>) => void`|Promise<undefined \| Record<string, ValidatedError>>||
|resetFields|重置表单数据|field: `string \| string[]`|-||
|clearValidate|清除校验状态|field: `string \| string[]`|-||
|setFields|设置表单项的值和状态|data: `Record<string, FieldData>`|-||
|scrollToField|滚动到指定表单项|field: `string`|-|2.51.0|

### `<form-item>` 属性

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|field|表单元素在数据对象中的path（数据项必填）|`string`|`''`||
|label|标签的文本|`string`|`-`||
|tooltip|提示内容|`string`|`-`|2.41.0|
|show-colon|是否显示冒号|`boolean`|`false`||
|no-style|是否去除样式|`boolean`|`false`||
|disabled|是否禁用|`boolean`|`-`||
|help|帮助文案|`string`|`-`||
|extra|额外显示的文案|`string`|`-`||
|required|是否必须填写|`boolean`|`false`||
|asterisk-position|可选择将星号置于 label 前/后|`'start' \| 'end'`|`'start'`|2.41.0|
|rules|表单项校验规则（优先级高于 form 的 rules）|`FieldRule \| FieldRule[]`|`-`||
|validate-status|校验状态|`'success' \| 'warning' \| 'error' \| 'validating'`|`-`||

> 仅列出常用项，低频属性按需查阅官方 API。

### `<form-item>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|label|标签|-|
|help|帮助信息|-|
|extra|额外内容|-|

### 类型定义

### FieldRule

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|type|校验的值的类型，默认为 `'string'`|`'string'    \| 'number'    \| 'boolean'    \| 'array'    \| 'object'    \| 'email'    \| 'url'    \| 'ip'`|`-`|
|required|是否必填|`boolean`|`false`|
|message|校验失败时展示的信息|`string`|`-`|
|length|校验长度（string, array）|`number`|`-`|
|maxLength|最大长度（string）|`number`|`-`|
|minLength|最小长度（string）|`number`|`-`|
|match|匹配校验（string）|`RegExp`|`-`|
|uppercase|大写（string）|`boolean`|`false`|
|lowercase|小写（string）|`boolean`|`false`|
|min|最小值（number）|`number`|`-`|
|max|最大值（number）|`number`|`-`|
|equal|校验数值（number）|`number`|`-`|

> 仅列出常用项，低频属性按需查阅官方 API。

### FieldData

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|value|字段的值|`any`|`-`|
|status|字段的状态|`ValidateStatus`|`-`|
|message|字段的错误信息|`string`|`-`|

### ValidatedError

|参数名|描述|类型|默认值|版本|
|---|---|---|:---:|:---|
|label|标签的文本|`string`|`-`|2.18.0|
|field|字段名|`string`|`-`||
|value|字段值|`any`|`-`||
|type|字段类型|`string`|`-`||
|isRequiredError|是否为 `required` 错误|`boolean`|`false`||
|message|错误信息|`string`|`-`||

### FormItemEventHandler

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|onChange|onChange|`(ev?: Event) => void`|`-`|
|onInput|onInput|`(ev?: Event) => void`|`-`|
|onFocus|onFocus|`(ev?: Event) => void`|`-`|
|onBlur|onBlur|`(ev?: Event) => void`|`-`|

### useFormItem

```ts
const useFormItem = (data: {
  size?: Ref<Size | undefined>;
  disabled?: Ref<boolean>;
  error?: Ref<boolean>;
}) => {
  mergedSize:Ref<Size>;
  mergedDisabled:Ref<boolean>;
  mergedError:Ref<boolean>;
  feedback:Ref<string>;
  eventHandlers:Ref<FormItemEventHandler>;
}
```

## 常用模式

- **表单布局**：表单支持三种布局方式： `horizontal` - 水平排列 **（默认）**， `vertical` - 垂直排列， `inline` - 行内排列。
- **额外信息和帮助信息**：可以使用 `extra` 添加额外信息。如果需要在外部自定义校验信息，可以使用 `help` 属性或插槽。设置 `help` 时校验信息会被屏蔽。
- **嵌套数据**：展示了多种表单项嵌套的方式。表单项组件默认会将表单项状态和事件绑定到第一子组件，如果想要使用表单项进行布局设置，请设置 `:merge-props="false"` 以关闭绑定，或者使用函数指定需要绑定的数据。
- **栅格布局**：展示了使用栅格布局的方式。可以使用 `label-col-flex` 属性指定标签的具体宽度。
- **自动标签宽度**：设置 `auto-label-width` 开启自动标签宽度。仅在 `layout="horizontal"` 布局下生效。_* 目前仅在首次加载后生效。_
- **验证表单**：展示了表单校验的使用方法。
- **验证表单2**：展示了表单校验`rules`使用在`a-form`上的使用方法，以及可以直接校验`email`、`ip`、`url`
- **自定义表单校验状态**：开启 `feedback` 可以让部分输入组件展示当前状态信息

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 需要进入表单校验或提交流程的控件，优先放在 `a-form-item` 中并绑定明确的 `field`。
- 输入值优先使用 `v-model`；范围、弹窗类状态使用组件文档中的命名 `v-model:*`。
