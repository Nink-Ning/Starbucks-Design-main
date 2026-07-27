<template>
  <h3 :style="{ color: 'var(--color-text-2)' }">10000 items</h3>
  <List
    :style="{ width: `600px` }"
    :virtualListProps="{ height: 560 }"
    :data="list"
  >
    <template #item="{ item, index }">
      <ListItem :key="index">
        <ListItemMeta :title="item.title" :description="item.description">
          <template #avatar>
            <Avatar shape="square"> A </Avatar>
          </template>
        </ListItemMeta>
      </ListItem>
    </template>
  </List>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const list = reactive(Array(10000).fill(null).map((_, index) => {
  const prefix = `0000${index}`.slice(-5);
  return {
    title: 'Beijing Bytedance Technology Co., Ltd.',
    description: `(${prefix}) Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.`,
  };
}));
</script>
