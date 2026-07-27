<template>
  <div style="margin-bottom: 20px;">
    <RadioGroup v-model="size" type="button">
      <Radio value="mini">mini</Radio>
      <Radio value="small">small</Radio>
      <Radio value="medium">medium</Radio>
      <Radio value="large">large</Radio>
    </RadioGroup>
  </div>
  <DatePicker :size="size" style="width: 254px;" />
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue';
const state = reactive({
  size: 'small',
});

const { size } = toRefs(state);
</script>
