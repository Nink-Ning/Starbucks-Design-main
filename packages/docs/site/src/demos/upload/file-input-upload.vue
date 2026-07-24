<template>
  <div class="sb-upload-demo">
    <div class="sb-upload-input-row">
      <Input
        :model-value="fileName"
        readonly
        placeholder="还未选择文件"
        aria-label="已选择的文件"
      />
      <Upload
        action="/"
        :auto-upload="false"
        :show-file-list="false"
        @change="handleChange"
      >
        <template #upload-button>
          <Button type="outline">上传文件</Button>
        </template>
      </Upload>
    </div>
    <div class="sb-upload-tip">{{ tip }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import './showcase.css';

const tip = '额外提示语，文字过多时宽度折行';
const fileName = ref('');

const handleChange = (files, currentFile) => {
  fileName.value = currentFile?.name ?? files.at(-1)?.name ?? '';
};
</script>
