<script setup lang="ts">
import { computed } from 'vue'
import type { FormControlAreaProps } from './interface'

defineOptions({ name: 'FormControlArea' })

const props = withDefaults(defineProps<FormControlAreaProps>(), { align: 'center' })

const areaStyle = computed(() => ({
  ...(props.minHeight === undefined
    ? {}
    : { minHeight: typeof props.minHeight === 'number' ? `${props.minHeight}px` : props.minHeight }),
}))
</script>

<template>
  <div
    :class="['sbux-pro-form-control-area', `sbux-pro-form-control-area-align-${props.align}`, props.class]"
    :style="[areaStyle, props.style]"
  >
    <slot />
  </div>
</template>
