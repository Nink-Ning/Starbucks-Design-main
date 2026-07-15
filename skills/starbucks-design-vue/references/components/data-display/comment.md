---
name: starbucks-vue-comment
description: "Starbucks UI Vue 评论 Comment 组件参考。用于 Vue 3、`@sbux/starbucks-design-vue`、`<a-comment>`、属性、事件、插槽、示例和实现细节。"
user-invocable: false
---

# 评论 Comment

## 简介

一个基本的评论组件，带有作者、头像、时间和操作。

## 基本用法

```vue
<template>
  <a-comment
    author="Socrates"
    content="Comment body content."
    datetime="1 hour"
  >
    <template #actions>
      <span class="action" key="heart" @click="onLikeChange">
        <span v-if="like">
          <IconHeartFill :style="{ color: '#f53f3f' }" />
        </span>
        <span v-else>
          <IconHeart />
        </span>
        {{ 83 + (like ? 1 : 0) }}
      </span>
      <span class="action" key="star" @click="onStarChange">
        <span v-if="star">
          <IconStarFill style="{ color: '#ffb400' }" />
        </span>
        <span v-else>
          <IconStar />
        </span>
        {{ 3 + (star ? 1 : 0) }}
      </span>
      <span class="action" key="reply">
        <IconMessage /> Reply
      </span>
    </template>
    <template #avatar>
      <a-avatar>
        <img
          alt="avatar"
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
        />
      </a-avatar>
    </template>
  </a-comment>
</template>

<script>
import { ref } from 'vue';
import {
  IconHeart,
  IconMessage,
  IconStar,
  IconStarFill,
  IconHeartFill,
} from '@arco-design/web-vue/es/icon';

export default {
  components: {
    IconHeart,
    IconMessage,
    IconStar,
    IconStarFill,
    IconHeartFill,
  },
  setup() {
    const like = ref(false);
    const star = ref(false);
    const onLikeChange = () => {
      like.value = !like.value;
    };
    const onStarChange = () => {
      star.value = !star.value;
    };

    return {
      like,
      star,
      onLikeChange,
      onStarChange
    }
  },
};
</script>
<style scoped>
.action {
  display: inline-block;
  padding: 0 4px;
  color: var(--color-text-1);
  line-height: 24px;
  background: transparent;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.1s ease;
}
.action:hover {
  background: var(--color-fill-3);
}
</style>
```

## API

### `<comment>` 属性

|参数名|描述|类型|默认值|
|---|---|---|:---:|
|author|作者名|`string`|`-`|
|avatar|头像|`string`|`-`|
|content|评论内容|`string`|`-`|
|datetime|时间描述|`string`|`-`|
|align|靠左/靠右 展示 datetime 和 actions|`'left' \| 'right' \| { datetime?: "left" \| "right"; actions?: "left" \| "right" }`|`'left'`|

### `<comment>` 插槽

|插槽名|描述|参数|
|---|:---:|---|
|avatar|头像|-|
|author|作者|-|
|datetime|时间描述|-|
|content|评论内容|-|
|actions|操作列表|-|

## 常用模式

- **对齐**：通过 `align` 属性可以设置 `datetime` 和 `actions` 的对齐方式.
- **嵌套评论**：评论可以嵌套使用
- **回复框**：评论框配合回复框使用

## 最佳实践

- 新代码优先使用 Vue 3、Composition API 和 `<script setup lang="ts">`。
- 模板属性使用 kebab-case，事件使用 `@event-name`，插槽使用 `#slot-name`。
- 不要套用 React 专属 API，例如 JSX children、`Component.Sub` 或 `Form.useForm`。
- 数据展示组件只负责呈现，分页、筛选、排序等远程状态放在业务层维护。
- 大数据量场景优先使用组件自带的分页、虚拟滚动或懒加载能力。
