<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { Spin as ASpin } from '@arco-design/web-vue'
import { PageHeader } from '../page-header'
import type { PageContainerProps } from './interface'

defineOptions({ name: 'PageContainer' })

const props = withDefaults(defineProps<PageContainerProps>(), {
  backable: false,
  ghost: false,
  loading: false,
})

const emit = defineEmits<{ back: [] }>()

const slots = useSlots()
const hasHeader = computed(() => props.title != null || !!slots.title || !!slots.extra)
</script>

<template>
  <div class="sbux-pro-page-container">
    <PageHeader
      v-if="hasHeader"
      class="sbux-pro-page-container-header"
      :title="title ?? ''"
      :help-text="helpText"
      :help-link="helpLink"
      :backable="backable"
      @back="emit('back')"
    >
      <template v-if="$slots.title" #title><slot name="title" /></template>
      <template v-if="$slots.extra" #extra><slot name="extra" /></template>
    </PageHeader>
    <ASpin :loading="loading" class="sbux-pro-page-container-spin">
      <div
        class="sbux-pro-page-container-body"
        :class="{ 'sbux-pro-page-container-body-ghost': ghost }"
      >
        <slot />
      </div>
    </ASpin>
    <div v-if="$slots.footer" class="sbux-pro-page-container-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
