<template>
  <Space wrap>
    <Tag
      v-for="(tag, index) of tags"
      :key="tag"
      :closable="index !== 0"
      @close="handleRemove(tag)"
    >
      {{ tag }}
    </Tag>

    <Input
      v-if="showInput"
      ref="inputRef"
      :style="{ width: '90px' }"
      size="mini"
      v-model.trim="inputVal"
      @keyup.enter="handleAdd"
      @blur="handleAdd"
    />
    <Tag
      v-else
      :style="{
        width: '90px',
        backgroundColor: 'var(--color-fill-2)',
        border: '1px dashed var(--color-fill-3)',
        cursor: 'pointer',
      }"
      @click="handleEdit"
    >
      <template #icon>
        <icon-plus />
      </template>
      Add Tag
    </Tag>
  </Space>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { IconPlus } from '@sbux/starbucks-design-vue/icon';

const tags = ref(['Tag 1', 'Tag 2', 'Tag 3']);
const inputRef = ref(null);
const showInput = ref(false);
const inputVal = ref('');

const handleEdit = () => {
  showInput.value = true;

  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus();
    }
  });
};

const handleAdd = () => {
  if (inputVal.value) {
    tags.value.push(inputVal.value);
    inputVal.value = '';
  }
  showInput.value = false;
};

const handleRemove = (key) => {
  tags.value = tags.value.filter((tag) => tag !== key);
};
</script>
