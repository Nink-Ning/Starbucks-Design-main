<template>
  <div>
    <Split
      :style="{
        height: '200px',
        width: '100%',
        minWidth: '500px',
        border: '1px solid var(--color-border)',
      }"
      v-model:size="size"
      min="80px"
    >
      <template #first>
        <TypographyParagraph>Left</TypographyParagraph>
      </template>
      <template #second>
        <TypographyParagraph>Right</TypographyParagraph>
      </template>
    </Split>
  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs } from 'vue';
const state = reactive({
  size: 0.5,
});

const { size } = toRefs(state);
</script>