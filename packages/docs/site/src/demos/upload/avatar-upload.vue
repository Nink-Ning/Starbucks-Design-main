<template>
  <Space direction="vertical" :style="{ width: '100%' }">
    <Upload
      action="/"
      :fileList="file ? [file] : []"
      :show-file-list="false"
      @change="handleChange"
      @progress="handleProgress"
    >
      <template #upload-button>
        <div
          :class="`arco-upload-list-item${
            file && file.status === 'error'
              ? ' arco-upload-list-item-error'
              : ''
          }`"
        >
          <div
            class="arco-upload-list-picture custom-upload-avatar"
            v-if="file && file.url"
          >
            <img :src="file.url" />
            <div class="arco-upload-list-picture-mask">
              <IconEdit />
            </div>
            <Progress
              v-if="file.status === 'uploading' && file.percent < 100"
              :percent="file.percent"
              type="circle"
              size="mini"
              :style="{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translateX(-50%) translateY(-50%)',
              }"
            />
          </div>
          <div class="arco-upload-picture-card" v-else>
            <div class="arco-upload-picture-card-text">
              <IconPlus />
              <div style="margin-top: 10px; font-weight: 600">Upload</div>
            </div>
          </div>
        </div>
      </template>
    </Upload>
  </Space>
</template>

<script setup lang="ts">
import {
  IconEdit,
  IconPlus,
} from '@sbux/starbucks-design-vue/icon';
import { ref } from 'vue';

const file = ref();

const handleChange = (_, currentFile) => {
  file.value = {
    ...currentFile,
    // url: URL.createObjectURL(currentFile.file),
  };
};
const handleProgress = (currentFile) => {
  file.value = currentFile;
};
</script>
