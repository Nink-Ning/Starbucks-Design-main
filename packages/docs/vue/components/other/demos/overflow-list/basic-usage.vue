<template>
  <Form auto-label-width>
    <FormItem label="Tag Number">
      <InputNumber
        v-model="number"
        :min="0"
        :max="20"
        style="width: 200px"
      />
    </FormItem>
    <FormItem label="List Width">
      <Slider v-model="width" :min="0" :max="800" />
    </FormItem>
  </Form>
  <div :style="{ width: `${width}px`, marginTop: '20px' }">
    <OverflowList>
      <div>DIV Element</div>
      <Tag v-for="item of tags" :key="item">Tag{{ item }}</Tag>
    </OverflowList>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const width = ref(500);
const number = ref(10);
const tags = computed(() =>
  Array.from({ length: number.value }, (_, idx) => idx + 1)
);
</script>