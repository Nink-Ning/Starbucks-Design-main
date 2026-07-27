<script setup lang="ts">
import { Link as ALink, Tooltip as ATooltip } from '@arco-design/web-vue'
import { IconLeft, IconQuestionCircle } from '@arco-design/web-vue/es/icon'
import type { PageHeaderProps } from './interface'

defineOptions({ name: 'PageHeader' })

withDefaults(defineProps<PageHeaderProps>(), { backable: false })

const emit = defineEmits<{ back: [] }>()
</script>

<template>
  <div class="sbux-pro-page-header">
    <div class="sbux-pro-page-header-main">
      <span
        v-if="backable"
        class="sbux-pro-page-header-back"
        @click="emit('back')"
      ><IconLeft /></span>
      <slot name="title">
        <span class="sbux-pro-page-header-title">{{ title }}</span>
      </slot>
      <ATooltip v-if="helpText" position="bottom">
        <template #content>
          <span>{{ helpText }}</span>
          <ALink
            v-if="helpLink"
            class="sbux-pro-page-header-help-link"
            :href="helpLink"
            target="_blank"
          >查看更多</ALink>
        </template>
        <IconQuestionCircle class="sbux-pro-page-header-help" />
      </ATooltip>
    </div>
    <div v-if="$slots.extra" class="sbux-pro-page-header-extra">
      <slot name="extra" />
    </div>
  </div>
</template>
