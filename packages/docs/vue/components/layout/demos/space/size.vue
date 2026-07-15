<template>
  <div>
    <div style="marginBottom: 20px">
      <RadioGroup v-model="size" type="button">
        <Radio value="mini">mini</Radio>
        <Radio value="small">small</Radio>
        <Radio value="medium">medium</Radio>
        <Radio value="large">large</Radio>
      </RadioGroup>
    </div>
    <Space :size="size">
      <Button type="primary">Item1</Button>
      <Button type="primary">Item2</Button>
      <Button type="primary">Item3</Button>
    </Space>
  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue';
const state = reactive({
  size: 'medium',
});

const { size } = toRefs(state);
</script>