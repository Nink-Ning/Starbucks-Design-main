<template>
  <Space direction="vertical" :style="{ width: '100%' }">
    <Upload
      action="/"
      :default-file-list="[
        {
          uid: '-2',
          name: 'light.png',
          url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
        },
        {
          uid: '-1',
          name: 'ice.png',
          url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
        },
      ]"
      @before-remove="handleBeforeRemove"
    />
  </Space>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { Modal } from '@sbux/starbucks-design-vue';

// Capture this island's appContext so the imperative Modal API inherits the
// `arco-v` prefix-cls from the ConfigProvider in VueDemoLoader.vue — see
// scripts/docs-migration/RULES.md rule 5 addendum for why this is required.
const appContext = getCurrentInstance()!.appContext;

const handleBeforeRemove = (file) => {
  return new Promise((resolve, reject) => {
    Modal.confirm(
      {
        title: 'on-before-remove',
        content: `确认删除 ${file.name}`,
        onOk: () => resolve(true),
        onCancel: () => reject('cancel'),
      },
      appContext
    );
  });
};
</script>
