<script setup lang="ts">
import { computed } from 'vue'
import type { FormGridProps } from './interface'

defineOptions({ name: 'FormGrid' })

const props = defineProps<FormGridProps>()
const gridStyle = computed(() => (
  props.columns === undefined ? {} : { '--sbux-pro-form-grid-columns': props.columns }
))
</script>

<template>
  <div :class="['sbux-pro-form-grid', props.class]" :style="[gridStyle, props.style]"><slot /></div>
</template>
