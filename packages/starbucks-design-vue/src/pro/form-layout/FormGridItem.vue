<script setup lang="ts">
import { computed } from 'vue'
import type { FormGridItemProps } from './interface'

defineOptions({ name: 'FormGridItem' })

const props = defineProps<FormGridItemProps>()
const gridStyle = computed(() => (
  props.span === undefined ? {} : { '--sbux-pro-form-grid-item-span': Math.max(1, props.span) }
))
</script>

<template>
  <div :class="['sbux-pro-form-grid-item', props.class]" :style="[gridStyle, props.style]"><slot /></div>
</template>
