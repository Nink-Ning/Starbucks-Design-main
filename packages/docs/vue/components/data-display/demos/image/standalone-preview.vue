<template>
  <Button type="primary" @click="handleClick"
    >Click me to preview image</Button
  >
  <ImagePreview
    src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
    v-model:visible="visible"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);
const handleClick = () => {
  visible.value = true;
};
</script>