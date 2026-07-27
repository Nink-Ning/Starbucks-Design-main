<script setup lang="ts">
import { defineAsyncComponent, ref, onErrorCaptured } from 'vue';

const props = defineProps<{
  /** Demo name relative to src/demos, e.g. "button/basic" */
  name: string;
}>();

// Non-eager glob: each entry is a dynamic import() loader, code-split per demo.
// Resolution happens client-side inside this island's own hydration bundle
// (see ReactDemoLoader.tsx for why: Astro's client-hydration compiler check
// requires a static top-level import statement, which a runtime-computed
// demo path can't satisfy).
const modules = import.meta.glob('../**/*.vue');

// `name` is a fixed per-island prop (one demo per island), so resolve once.
const key = `../${props.name}.vue`;
const loader = modules[key];
const Comp = loader ? defineAsyncComponent(loader as () => Promise<any>) : null;

// Degrade one broken demo to a note instead of letting it blank the island.
const failed = ref(false);
onErrorCaptured((error) => {
  console.error(`[demo] Vue demo "${props.name}" failed:`, error);
  failed.value = true;
  return false;
});
</script>

<template>
  <div v-if="failed" class="sb-demo-error">该示例渲染失败</div>
  <component v-else-if="Comp" :is="Comp" />
</template>
