<script setup lang="ts">
import { ref } from 'vue'
import { TagGroupManagement } from '@sbux/starbucks-design-vue'
import type { TagGroupItem } from '@sbux/starbucks-design-vue'
import { demoGroups, getDemoTags, type TagRecord } from './shared'

let nextGroupId = 0
const groups = ref<TagGroupItem[]>([...demoGroups])
const lastAction = ref('请选择一个管理操作')

const createGroup = (name: string) => {
  groups.value = [...groups.value, { id: `group-${++nextGroupId}`, name }]
  lastAction.value = `已新增：${name}`
}

const renameGroup = (groupId: string, name: string) => {
  groups.value = groups.value.map((group) => (group.id === groupId ? { ...group, name } : group))
  lastAction.value = `已重命名：${name}`
}

const deleteGroup = (groupId: string) => {
  const group = groups.value.find((item) => item.id === groupId)
  groups.value = groups.value.filter((item) => item.id !== groupId)
  lastAction.value = `已删除：${group?.name ?? groupId}`
}
</script>

<template>
  <div class="sb-tag-group-management-demo sb-tag-group-management-demo--management">
    <div class="sb-tag-group-management-demo__note">操作事件由父级接收，父级更新 groups 后组件重新渲染。</div>
    <TagGroupManagement
      :groups="groups"
      default-active-group-id="store"
      :delete-confirm="
        (group) => ({
          title: `删除「${group.name}」？`,
          content: '删除确认只负责发出操作意图，关联关系和接口结果由调用方处理。',
          okText: '删除',
          cancelText: '取消'
        })
      "
      @create-group="createGroup"
      @rename-group="renameGroup"
      @delete-group="deleteGroup"
    >
      <template #content="{ activeGroup }">
        <div v-if="activeGroup" class="sb-tag-group-management-demo__content">
          <div class="sb-tag-group-management-demo__content-header">
            <div>
              <span class="sb-tag-group-management-demo__eyebrow">当前标签组</span>
              <h3>{{ activeGroup.name }}</h3>
            </div>
            <span class="sb-tag-group-management-demo__count">{{ getDemoTags(activeGroup.id).length }} 个标签</span>
          </div>
          <div class="sb-tag-group-management-demo__toolbar">
            <span>标签列表</span>
            <button type="button" class="sb-tag-group-management-demo__content-button">新增标签</button>
          </div>
          <div class="sb-tag-group-management-demo__table-wrap">
            <table>
              <thead>
                <tr>
                  <th>标签名称</th>
                  <th>状态</th>
                  <th>更新时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="record in getDemoTags(activeGroup.id)" :key="`${activeGroup.id}-${record.name}`">
                  <td>{{ record.name }}</td>
                  <td
                    ><span :data-status="record.status === '启用' ? 'active' : 'inactive'">{{
                      record.status
                    }}</span></td
                  >
                  <td>{{ record.updatedAt }}</td>
                  <td><button type="button" class="sb-tag-group-management-demo__text-button">编辑</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p v-else class="sb-tag-group-management-demo__placeholder">请选择左侧标签组查看内容。</p>
      </template>
    </TagGroupManagement>
    <p class="sb-tag-group-management-demo__event-status" aria-live="polite">{{ lastAction }}</p>
  </div>
</template>
