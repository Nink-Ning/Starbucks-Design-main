<script setup lang="ts">
import { computed } from 'vue'
import type { FormPageLayoutProps } from './interface'

defineOptions({ name: 'FormPageLayout' })

const props = defineProps<FormPageLayoutProps>()

const layoutStyle = computed(() => ({
  ...(props.maxWidth === undefined
    ? {}
    : { maxWidth: typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth }),
  ...(props.padding === undefined
    ? {}
    : { padding: typeof props.padding === 'number' ? `${props.padding}px` : props.padding }),
}))
</script>

<template>
  <div :class="['sbux-pro-form-page-layout', props.class]" :style="[layoutStyle, props.style]">
    <p v-if="props.description || $slots.description" class="sbux-pro-form-page-layout-description">
      <slot name="description">{{ props.description }}</slot>
    </p>
    <slot />
  </div>
</template>
