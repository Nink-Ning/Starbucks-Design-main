<template>
  <Form layout="inline" :model="form">
    <FormItem label="empty">
      <Switch v-model="form.empty" />
    </FormItem>
    <FormItem label="showHeaderOnEmpty">
      <Switch v-model="form.showHeaderOnEmpty" />
    </FormItem>
    <FormItem label="showFooterOnEmpty">
      <Switch v-model="form.showFooterOnEmpty" />
    </FormItem>
  </Form>
  <TreeSelect
    style="width: 300px"
    placeholder="请选择区域"
    :data="computedTreeData"
    :show-header-on-empty="form.showHeaderOnEmpty"
    :show-footer-on-empty="form.showFooterOnEmpty"
  >
    <template #header>
      <div style="padding: 6px 12px;">
        <Checkbox value="1">全部</Checkbox>
      </div>
    </template>
    <template #footer>
      <div style="padding: 6px 0; text-align: center;">
        <Button>确认</Button>
      </div>
    </template>
  </TreeSelect>
</template>
<script setup lang="ts">
import { reactive, computed } from 'vue';

const form = reactive({
  empty: false,
  showHeaderOnEmpty: false,
  showFooterOnEmpty: false,
});

const treeData = [
  {
    key: 'east',
    title: '华东区',
    children: [
      {
        key: 'shanghai',
        title: '上海市',
      },
    ],
  },
  {
    key: 'south',
    title: '华南区',
    children: [
      {
        key: 'guangdong',
        title: '广东省',
      },
      {
        key: 'fujian',
        title: '福建省',
      },
    ],
  },
];

const computedTreeData = computed(() => {
  return form.empty ? [] : treeData;
});
</script>
