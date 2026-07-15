---
name: starbucks-vue-table-patterns
description: "Starbucks UI Vue 表格模式。用于 `a-table`、列配置、数据源、行选择、分页、远程加载、插槽、排序和筛选。"
user-invocable: false
---

# 表格模式

完整表格 API 参考 [table.md](../components/data-display/table.md)。

## 基础表格

```vue
<script setup lang="ts">
const columns = [
  { title: '名称', dataIndex: 'name' },
  { title: '状态', dataIndex: 'status', slotName: 'status' },
  { title: '操作', slotName: 'actions' },
];

const data = [
  { key: '1', name: '任务 A', status: 'running' },
  { key: '2', name: '任务 B', status: 'done' },
];
</script>

<template>
  <a-table :columns="columns" :data="data" row-key="key">
    <template #status="{ record }">
      <a-tag :color="record.status === 'done' ? 'green' : 'blue'">
        {{ record.status }}
      </a-tag>
    </template>
    <template #actions="{ record }">
      <a-button type="text" size="small">查看 {{ record.name }}</a-button>
    </template>
  </a-table>
</template>
```

## 远程数据

- 将分页、筛选、排序状态放在本地响应式状态中。
- 用一个请求函数统一拉取数据，在 `onMounted` 和表格变更事件中复用。
- 请求中给表格设置加载状态，避免重复操作和空白反馈。
- 不要在每次渲染时重新创建列配置；列应定义一次，或由稳定输入计算得到。
