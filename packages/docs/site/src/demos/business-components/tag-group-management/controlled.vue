<script setup lang="ts">
import { computed, ref } from 'vue'
import { TagGroupManagement } from '@sbux/starbucks-design-vue'
import { demoGroups, getDemoTags } from './shared'

const activeGroupId = ref<string | null>('store')
const activeGroup = computed(() => demoGroups.find((group) => group.id === activeGroupId.value) ?? null)

const setActiveGroup = (groupId: string) => {
  activeGroupId.value = groupId
}

const onActiveGroupChange = (groupId: string | null) => {
  activeGroupId.value = groupId
}
</script>

<template>
  <div class="sb-tag-group-management-demo sb-tag-group-management-demo--controlled">
    <div class="sb-tag-group-management-demo__external-controls" aria-label="外部切换标签组">
      <span>外部控制：</span>
      <button
        v-for="group in demoGroups.filter((item) => !item.disabled).slice(0, 4)"
        :key="group.id"
        type="button"
        :aria-pressed="group.id === activeGroupId"
        @click="setActiveGroup(group.id)"
      >
        {{ group.name }}
      </button>
    </div>
    <p class="sb-tag-group-management-demo__event-status" aria-live="polite"
      >当前 activeGroupId：{{ activeGroupId ?? 'null' }}</p
    >
    <TagGroupManagement
      :groups="demoGroups"
      :active-group-id="activeGroupId"
      @active-group-change="onActiveGroupChange"
    >
      <template #content>
        <div v-if="activeGroup" class="sb-tag-group-management-demo__content">
          <div class="sb-tag-group-management-demo__content-header">
            <div>
              <span class="sb-tag-group-management-demo__eyebrow">外部 activeGroupId</span>
              <h3>{{ activeGroup.name }}</h3>
            </div>
            <span class="sb-tag-group-management-demo__count">{{ getDemoTags(activeGroup.id).length }} 个标签</span>
          </div>
          <div class="sb-tag-group-management-demo__table-wrap">
            <table>
              <thead
                ><tr><th>标签名称</th><th>状态</th><th>更新时间</th></tr></thead
              >
              <tbody>
                <tr v-for="record in getDemoTags(activeGroup.id)" :key="`${activeGroup.id}-${record.name}`"
                  ><td>{{ record.name }}</td
                  ><td>{{ record.status }}</td
                  ><td>{{ record.updatedAt }}</td></tr
                >
              </tbody>
            </table>
          </div>
        </div>
        <p v-else class="sb-tag-group-management-demo__placeholder">当前没有选中的标签组。</p>
      </template>
    </TagGroupManagement>
  </div>
</template>
