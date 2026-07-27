<template>
  <Image
    width="200"
    src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
    :preview-props="{
      actionsLayout: ['rotateRight', 'zoomIn', 'zoomOut'],
    }"
  >
    <template #preview-actions>
      <ImagePreviewAction name="下载" @click="handleDownload">
        <icon-download />
      </ImagePreviewAction>
    </template>
  </Image>
</template>

<script setup lang="ts">
import { IconDownload } from '@sbux/starbucks-design-vue/icon';

const handleDownload = () => {
  console.log('点击下载图片');
};
</script>
