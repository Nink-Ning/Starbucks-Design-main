<template>
  <Affix :offsetBottom="80" @change="handleChange">
    <Button type="primary">80px to affix bottom</Button>
  </Affix>
</template>
<script setup lang="ts">
import { defineComponent } from 'vue';

const handleChange = (fixed) => {
  console.log(`${fixed}`);
};
</script>