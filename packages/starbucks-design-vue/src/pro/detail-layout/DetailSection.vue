<script setup lang="ts">
import type { DetailSectionProps } from './interface'

defineOptions({ name: 'DetailSection' })

const props = withDefaults(defineProps<DetailSectionProps>(), { divider: false })
</script>

<template>
  <section
    :id="props.id"
    :class="[
      'sbux-pro-detail-section',
      { 'sbux-pro-detail-section-divider': props.divider },
      props.class,
    ]"
    :style="props.style"
  >
    <div
      v-if="props.title || props.description || $slots.actions"
      class="sbux-pro-detail-section-header"
    >
      <div class="sbux-pro-detail-section-heading">
        <h2 v-if="props.title" class="sbux-pro-detail-section-title">{{ props.title }}</h2>
        <p v-if="props.description" class="sbux-pro-detail-section-description">
          {{ props.description }}
        </p>
      </div>
      <div v-if="$slots.actions" class="sbux-pro-detail-section-actions">
        <slot name="actions" />
      </div>
    </div>
    <div class="sbux-pro-detail-section-content"><slot /></div>
  </section>
</template>
