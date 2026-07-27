<script setup lang="ts">
import type { PageFooterBarProps } from './interface'

defineOptions({ name: 'PageFooterBar' })

withDefaults(defineProps<PageFooterBarProps>(), { align: 'left', bordered: true })
</script>

<template>
  <div
    class="sbux-pro-page-footer-bar"
    :class="[
      `sbux-pro-page-footer-bar-align-${align}`,
      { 'sbux-pro-page-footer-bar-bordered': bordered },
    ]"
  >
    <slot />
  </div>
</template>
