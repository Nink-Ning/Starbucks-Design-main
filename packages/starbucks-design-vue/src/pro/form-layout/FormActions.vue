<script setup lang="ts">
import { computed } from 'vue'
import type { FormActionsProps } from './interface'

defineOptions({ name: 'FormActions' })

const props = withDefaults(defineProps<FormActionsProps>(), { align: 'right', sticky: false })

const actionsStyle = computed(() => ({
  ...(props.gap === undefined
    ? {}
    : { gap: typeof props.gap === 'number' ? `${props.gap}px` : props.gap }),
}))
</script>

<template>
  <div
    :class="[
      'sbux-pro-form-actions',
      `sbux-pro-form-actions-align-${props.align}`,
      { 'sbux-pro-form-actions-sticky': props.sticky },
      props.class,
    ]"
    :style="[actionsStyle, props.style]"
  >
    <slot />
  </div>
</template>
