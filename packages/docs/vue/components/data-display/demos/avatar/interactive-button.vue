<template>
  <Space size="large">
    <Avatar
      :trigger-icon-style="{ color: '#3491FA' }"
      :auto-fix-font-size="false"
      @click="handleToast"
      :style="{ backgroundColor: '#168CFF' }"
    >
      A
      <template #trigger-icon>
        <IconCamera />
      </template>
    </Avatar>
    <Avatar @click="handleToast" :style="{ backgroundColor: '#14C9C9' }">
      <IconUser />
      <template #trigger-icon>
        <IconEdit />
      </template>
    </Avatar>
    <Avatar
      @click="handleToast"
      shape="square"
      :style="{ backgroundColor: '#FFC72E' }"
    >
      <IconUser />
      <template #trigger-icon>
        <IconEdit />
      </template>
    </Avatar>
    <Avatar trigger-type="mask">
      <img
        alt="avatar"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      />
      <template #trigger-icon>
        <IconEdit />
      </template>
    </Avatar>
  </Space>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue';
import {
  IconCamera,
  IconEdit,
  IconUser,
} from '@arco-design/web-vue/es/icon';

const handleToast = () => {
  Message.info('Uploading...');
};
</script>