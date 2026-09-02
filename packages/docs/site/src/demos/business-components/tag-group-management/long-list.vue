<script setup lang="ts">
import { TagGroupManagement } from '@sbux/starbucks-design-vue'
import { longGroups, longTagRecords } from './shared'
</script>

<template>
  <div class="sb-tag-group-management-demo sb-tag-group-management-demo__long-list">
    <TagGroupManagement :groups="longGroups" :default-active-group-id="longGroups[0]?.id">
      <template #content="{ activeGroup }">
        <div class="sb-tag-group-management-demo__content">
          <div class="sb-tag-group-management-demo__content-header">
            <div>
              <span class="sb-tag-group-management-demo__eyebrow">30 个标签组 · 右侧独立滚动</span>
              <h3>{{ activeGroup?.name ?? '未选择标签组' }}</h3>
            </div>
            <span class="sb-tag-group-management-demo__count">{{ longTagRecords.length }} 个标签</span>
          </div>
          <div class="sb-tag-group-management-demo__table-wrap">
            <table>
              <thead
                ><tr><th>标签名称</th><th>状态</th><th>更新时间</th></tr></thead
              >
              <tbody>
                <tr v-for="record in longTagRecords" :key="record.name"
                  ><td>{{ record.name }}</td
                  ><td>{{ record.status }}</td
                  ><td>{{ record.updatedAt }}</td></tr
                >
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </TagGroupManagement>
  </div>
</template>
