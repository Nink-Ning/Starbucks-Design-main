<template>
  <Space>
    <ColorPicker v-model="value" size="mini">
      <Tag :color="value">
        <template #icon>
          <icon-bg-colors style="color: #fff" />
        </template>
        {{ value }}
      </Tag>
    </ColorPicker>
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref('#165DFF');
</script>