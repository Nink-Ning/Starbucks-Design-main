<script setup lang="ts">
import { ref } from 'vue'
import { TagGroupManagement } from '@sbux/starbucks-design-vue'
import { demoGroups, getDemoTags } from './shared'

type DemoState = 'normal' | 'loading' | 'disabled' | 'empty' | 'searchEmpty'
const state = ref<DemoState>('normal')
const stateOptions: Array<{ value: DemoState; label: string }> = [
  { value: 'normal', label: 'Normal' },
  { value: 'loading', label: 'Loading' },
  { value: 'disabled', label: 'Disabled' },
  { value: 'empty', label: 'Empty' },
  { value: 'searchEmpty', label: 'Search Empty（输入无结果）' }
]
</script>

<template>
  <div class="sb-tag-group-management-demo sb-tag-group-management-demo__states">
    <div class="sb-tag-group-management-demo__state-switch" role="tablist" aria-label="选择状态场景">
      <button
        v-for="option in stateOptions"
        :key="option.value"
        type="button"
        role="tab"
        :aria-selected="state === option.value"
        @click="state = option.value"
      >
        {{ option.label }}
      </button>
    </div>
    <p v-if="state === 'searchEmpty'" class="sb-tag-group-management-demo__state-note"
      >在左侧搜索框输入不存在的名称，查看 searchEmpty 空状态。</p
    >
    <div class="sb-tag-group-management-demo__state-component">
      <TagGroupManagement
        :groups="state === 'empty' ? [] : demoGroups"
        :loading="state === 'loading'"
        :disabled="state === 'disabled'"
        default-active-group-id="store"
      >
        <template #empty="context">
          <div class="sb-tag-group-management-demo__empty-message">{{
            context.type === 'searchEmpty' ? '没有匹配的标签组' : '暂无标签组'
          }}</div>
        </template>
        <template #content="{ activeGroup }">
          <div class="sb-tag-group-management-demo__content">
            <div class="sb-tag-group-management-demo__content-header">
              <div
                ><span class="sb-tag-group-management-demo__eyebrow">右侧内容仍由调用方渲染</span
                ><h3>{{ activeGroup?.name ?? '门店标签' }}</h3></div
              >
              <span class="sb-tag-group-management-demo__count"
                >{{ activeGroup ? getDemoTags(activeGroup.id).length : 0 }} 个标签</span
              >
            </div>
            <p class="sb-tag-group-management-demo__placeholder">{{
              state === 'loading' ? '左侧加载中，右侧业务内容保持展示。' : '组件只控制左侧管理区。'
            }}</p>
          </div>
        </template>
      </TagGroupManagement>
    </div>
  </div>
</template>
