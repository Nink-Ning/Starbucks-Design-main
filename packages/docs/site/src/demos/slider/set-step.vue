<template>
  <Space direction="vertical" size="large">
    <Form :model="data" layout="inline">
      <FormItem label="Step" field="step">
        <InputNumber :style="{ width: '100px' }" v-model="data.step" />
      </FormItem>
      <FormItem label="Show steps" field="showTicks">
        <Switch v-model="data.showTicks" />
      </FormItem>
    </Form>
    <Slider
      :default-value="20"
      :style="{ width: '300px' }"
      :step="data.step"
      :show-ticks="data.showTicks"
    />
  </Space>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const data = reactive({
  step: 5,
  showTicks: true,
});
</script>