<template>
  <Space size="large">
    <Avatar>A</Avatar>
    <Avatar :style="{ backgroundColor: '#3370ff' }">
      <IconUser />
    </Avatar>
    <Avatar :style="{ backgroundColor: '#14a9f8' }">Arco</Avatar>
    <Avatar :style="{ backgroundColor: '#00d0b6' }">Design</Avatar>
    <Avatar>
      <img
        alt="avatar"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
      />
    </Avatar>
  </Space>
</template>

<script setup lang="ts">
import { IconUser } from '@sbux/starbucks-design-vue/icon';
</script>
