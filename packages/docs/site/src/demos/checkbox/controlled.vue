<template>
  <Space size="large">
    <Checkbox v-model="checked1">v-model</Checkbox>
    <Checkbox :model-value="true">binding value</Checkbox>
    <Checkbox :model-value="checked2">binding value2</Checkbox>
    <Checkbox :default-checked="true">uncontrolled state</Checkbox>
  </Space>
  <div :style="{ marginTop: '20px' }">
    <Button type="primary" @click="handleSetCheck">
      {{ checked2 ? 'uncheck' : 'check' }} value2
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checked1 = ref(false);
const checked2 = ref(false);

const handleSetCheck = () => {
  checked2.value = !checked2.value;
};
</script>