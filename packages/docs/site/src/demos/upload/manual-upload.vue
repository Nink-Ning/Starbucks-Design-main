<template>
  <div>
    <Upload
      action="/"
      :auto-upload="false"
      ref="uploadRef"
      @change="handleChange"
      multiple
    >
      <template #upload-button>
        <Space>
          <Button>选择文件</Button>
          <Button type="primary" @click="handleSubmit">
            开始上传</Button
          >
          <Button type="primary" @click="handleSubmitOne">
            仅上传一个
          </Button>
        </Space>
      </template>
    </Upload>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const uploadRef = ref();
const files = ref([]);

const handleSubmitOne = (e) => {
  e.stopPropagation();
  console.log(files.value);
  uploadRef.value.handleSubmit(files.value.find((x) => x.status === 'init'));
};

const handleSubmit = (e) => {
  e.stopPropagation();
  uploadRef.value.handleSubmit();
};

const handleChange = (fileList) => {
  files.value = fileList;
};
</script>
