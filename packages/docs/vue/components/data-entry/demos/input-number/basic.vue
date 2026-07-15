<template>
  <Space direction="vertical" size="large">
    <InputNumber
      v-model="value"
      :style="{ width: '320px' }"
      placeholder="Please Enter"
      class="input-demo"
      :min="10"
      :max="100"
    />
    <InputNumber
      :style="{ width: '320px' }"
      placeholder="Please Enter"
      class="input-demo"
      :min="10"
      :max="100"
    />
    <InputNumber
      :style="{ width: '320px' }"
      placeholder="Please Enter"
      :default-value="500"
      class="input-demo"
      disabled
    />
  </Space>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue';
const state = reactive({
  value: 15,
});

const { value } = toRefs(state);
</script>