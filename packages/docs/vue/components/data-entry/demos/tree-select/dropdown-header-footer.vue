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
    placeholder="Please select ..."
    :data="computedTreeData"
    :show-header-on-empty="form.showHeaderOnEmpty"
    :show-footer-on-empty="form.showFooterOnEmpty"
  >
    <template #header>
      <div style="padding: 6px 12px;">
        <Checkbox value="1">All</Checkbox>
      </div>
    </template>
    <template #footer>
      <div style="padding: 6px 0; text-align: center;">
        <Button>Click Me</Button>
      </div>
    </template>
  </TreeSelect>
</template>
<script setup lang="ts">
import { h, reactive, computed } from 'vue';
import { IconCalendar } from '@arco-design/web-vue/es/icon';

const form = reactive({
  empty: false,
  showHeaderOnEmpty: false,
  showFooterOnEmpty: false,
});

const treeData = [
  {
    key: 'node1',
    icon: () => h(IconCalendar),
    title: 'Trunk',
    children: [
      {
        key: 'node2',
        title: 'Leaf',
      },
    ],
  },
  {
    key: 'node3',
    title: 'Trunk2',
    icon: () => h(IconCalendar),
    children: [
      {
        key: 'node4',
        title: 'Leaf',
      },
      {
        key: 'node5',
        title: 'Leaf',
      },
    ],
  },
  {
    key: 'node6',
    title: 'Trunk3',
    icon: () => h(IconCalendar),
    children: [
      {
        key: 'node7',
        title: 'Leaf',
      },
      {
        key: 'node8',
        title: 'Leaf',
      },
    ],
  },
];

const computedTreeData = computed(() => {
  return form.empty ? [] : treeData;
});
</script>