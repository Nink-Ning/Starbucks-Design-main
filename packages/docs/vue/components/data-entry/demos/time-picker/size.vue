<template>
  <div style="marginBottom: 20px">
    <RadioGroup v-model="size" type="button">
      <Radio value="mini">mini</Radio>
      <Radio value="small">small</Radio>
      <Radio value="medium">medium</Radio>
      <Radio value="large">large</Radio>
    </RadioGroup>
  </div>
  <TimePicker style="width: 194px;" :size="size" />
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue';
const state = reactive({
  size: 'small',
});

const { size } = toRefs(state);
</script>