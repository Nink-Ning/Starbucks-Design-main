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
import { IconBgColors } from '@sbux/starbucks-design-vue/icon';

const value = ref('#00754A');
</script>
