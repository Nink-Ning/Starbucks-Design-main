<script setup lang="ts">
import type { StepFormLayoutProps } from './interface'

defineOptions({ name: 'StepFormLayout' })

const props = withDefaults(defineProps<StepFormLayoutProps>(), { stickyActions: false })
</script>

<template>
  <div
    :class="[
      'sbux-pro-step-form-layout',
      { 'sbux-pro-step-form-layout-sticky-actions': props.stickyActions },
      props.class,
    ]"
    :style="props.style"
  >
    <div v-if="$slots.steps" class="sbux-pro-step-form-layout-steps"><slot name="steps" /></div>
    <div class="sbux-pro-step-form-layout-content"><slot /></div>
    <div v-if="$slots.actions" class="sbux-pro-step-form-layout-actions"><slot name="actions" /></div>
  </div>
</template>
