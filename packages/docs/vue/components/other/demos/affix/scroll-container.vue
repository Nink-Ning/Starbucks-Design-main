<template>
  <div style="height: 200px; overflow: auto" ref="containerRef">
    <div style="height: 400px; background: #cccccc; overflow: hidden">
      <Affix :offsetTop="20" :target="containerRef" style="margin: 40px">
        <Button type="primary">Affix in scrolling container</Button>
      </Affix>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const containerRef = ref();
</script>