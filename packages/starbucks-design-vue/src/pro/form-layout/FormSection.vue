<script setup lang="ts">
import type { FormSectionProps } from './interface'

defineOptions({ name: 'FormSection' })

const props = withDefaults(defineProps<FormSectionProps>(), {
  divider: false,
  error: false,
})
</script>

<template>
  <section
    :id="props.id"
    :class="[
      'sbux-pro-form-section',
      {
        'sbux-pro-form-section-divider': props.divider,
        'sbux-pro-form-section-error': props.error,
      },
      props.class,
    ]"
    :style="props.style"
    :data-section-error="props.error || undefined"
  >
    <div
      v-if="props.title || props.description || $slots.extra"
      class="sbux-pro-form-section-header"
    >
      <div class="sbux-pro-form-section-heading">
        <h2 v-if="props.title" class="sbux-pro-form-section-title">{{ props.title }}</h2>
        <p v-if="props.description" class="sbux-pro-form-section-description">{{ props.description }}</p>
      </div>
      <div v-if="$slots.extra" class="sbux-pro-form-section-actions"><slot name="extra" /></div>
    </div>
    <div class="sbux-pro-form-section-content"><slot /></div>
  </section>
</template>
