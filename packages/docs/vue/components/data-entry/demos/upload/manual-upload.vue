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
          <Button> select file</Button>
          <Button type="primary" @click="handleSubmit">
            start upload</Button
          >
          <Button type="primary" @click="handleSubmitOne">
            only upload one
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