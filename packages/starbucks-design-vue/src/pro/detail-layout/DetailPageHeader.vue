<script setup lang="ts">
import { Button as AButton } from '@arco-design/web-vue'
import { IconLeft } from '@arco-design/web-vue/es/icon'
import type { DetailPageHeaderProps } from './interface'

defineOptions({ name: 'DetailPageHeader' })

const props = withDefaults(defineProps<DetailPageHeaderProps>(), { backable: false })
const emit = defineEmits<{ back: [] }>()
</script>

<template>
  <header
    :class="['sbux-pro-detail-page-header', props.class]"
    :style="props.style"
  >
    <div class="sbux-pro-detail-page-header-main">
      <AButton
        v-if="props.backable"
        class="sbux-pro-detail-page-header-back"
        type="text"
        shape="circle"
        aria-label="返回"
        @click="emit('back')"
      >
        <IconLeft />
      </AButton>
      <div class="sbux-pro-detail-page-header-content">
        <div class="sbux-pro-detail-page-header-title-row">
          <h1 class="sbux-pro-detail-page-header-title">
            <slot name="title">{{ props.title }}</slot>
          </h1>
          <div
            v-if="props.status || $slots.status"
            class="sbux-pro-detail-page-header-status"
          >
            <slot name="status">{{ props.status }}</slot>
          </div>
        </div>
        <p
          v-if="props.description || $slots.description"
          class="sbux-pro-detail-page-header-description"
        >
          <slot name="description">{{ props.description }}</slot>
        </p>
        <div
          v-if="props.meta || $slots.meta"
          class="sbux-pro-detail-page-header-meta"
        >
          <slot name="meta">{{ props.meta }}</slot>
        </div>
      </div>
    </div>
    <div v-if="$slots.actions" class="sbux-pro-detail-page-header-actions">
      <slot name="actions" />
    </div>
  </header>
</template>
