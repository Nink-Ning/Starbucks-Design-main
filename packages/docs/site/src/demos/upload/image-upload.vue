<template>
  <div class="sb-upload-demo">
    <Upload
      action="/"
      accept="image/*"
      list-type="picture-card"
      :show-file-list="false"
    >
      <template #upload-button>
        <Button class="sb-upload-image-trigger" type="outline">点击上传图片</Button>
      </template>
    </Upload>
    <div class="sb-upload-tip">{{ tip }}</div>
  </div>
</template>

<script setup lang="ts">
import './showcase.css';

const tip = '额外提示语，文字过多时宽度折行';
</script>
