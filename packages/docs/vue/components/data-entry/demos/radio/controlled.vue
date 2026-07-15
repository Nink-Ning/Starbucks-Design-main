<template>
  <Space size="large">
    <Radio v-model="checked1">v-model</Radio>
    <Radio :model-value="true">binding "true"</Radio>
    <Radio :model-value="checked2">binding value2</Radio>
    <Radio :default-checked="true">uncontrolled state</Radio>
  </Space>
  <div :style="{ marginTop: '20px' }">
    <Space size="large">
      <Button type="primary" @click="handleSetCheck">
        {{ checked2 ? 'uncheck' : 'check' }} value2
      </Button>
      <Button @click="handleReset"> reset all </Button>
    </Space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checked1 = ref(false);
const checked2 = ref(false);

const handleSetCheck = () => {
  checked2.value = !checked2.value;
};

const handleReset = () => {
  checked1.value = false;
  checked2.value = false;
};
</script>