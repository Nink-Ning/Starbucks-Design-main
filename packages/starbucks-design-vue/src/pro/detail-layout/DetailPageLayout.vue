<script setup lang="ts">
import { computed } from 'vue'
import type { DetailPageLayoutProps } from './interface'

defineOptions({ name: 'DetailPageLayout' })

const props = defineProps<DetailPageLayoutProps>()

function toCssLength(value: string | number) {
  return typeof value === 'number' ? `${value}px` : value
}

const layoutStyle = computed(() => ({
  ...(props.maxWidth === undefined ? {} : { maxWidth: toCssLength(props.maxWidth) }),
  ...(props.gap === undefined ? {} : { gap: toCssLength(props.gap) }),
}))
</script>

<template>
  <div
    :class="['sbux-pro-detail-page-layout', props.class]"
    :style="[layoutStyle, props.style]"
  >
    <slot />
  </div>
</template>
