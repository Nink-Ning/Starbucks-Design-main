<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  Message,
} from '@sbux/starbucks-design-vue';
import {
  IconDelete,
  IconDown,
  IconEdit,
  IconInfoCircle,
  IconPlus,
  IconRefresh,
  IconSearch,
  IconSettings,
  IconUpload,
} from '@sbux/starbucks-design-vue/icon';

type TagGroup = {
  id: string;
  name: string;
  disabled?: boolean;
};

type TagRecord = {
  id: string;
  name: string;
  status: 'enabled' | 'disabled';
  memberCount: number;
  creator: string;
  createdAt: string;
};

const pageSize = 5;

const groups = ref<TagGroup[]>([
  { id: 'profile', name: '基础属性' },
  { id: 'preference', name: '消费偏好' },
  { id: 'level', name: '会员等级' },
  { id: 'system', name: '系统标签', disabled: true },
  { id: 'activity', name: '活跃状态' },
  { id: 'store', name: '门店偏好' },
]);

const tags = ref<TagRecord[]>([
  { id: 'TAG-001', name: '高价值客户', status: 'enabled', memberCount: 56, creator: 'Nink', createdAt: '2026-07-24 10:30' },
  { id: 'TAG-002', name: '新品尝鲜用户', status: 'enabled', memberCount: 48, creator: 'Kim', createdAt: '2026-07-23 15:20' },
  { id: 'TAG-003', name: '高频到店会员', status: 'enabled', memberCount: 32, creator: 'Alex', createdAt: '2026-07-22 09:15' },
  { id: 'TAG-004', name: '外送偏好用户', status: 'enabled', memberCount: 22, creator: 'Mia', createdAt: '2026-07-21 18:00' },
  { id: 'TAG-005', name: '臻选门店会员', status: 'enabled', memberCount: 10, creator: 'Jade', createdAt: '2026-07-21 13:48' },
  { id: 'TAG-006', name: '近 30 天活跃', status: 'enabled', memberCount: 86, creator: 'Owen', createdAt: '2026-07-20 16:12' },
  { id: 'TAG-007', name: '周末消费偏好', status: 'disabled', memberCount: 18, creator: 'Rita', createdAt: '2026-07-20 11:06' },
  { id: 'TAG-008', name: '早餐时段用户', status: 'enabled', memberCount: 41, creator: 'Ben', createdAt: '2026-07-19 19:35' },
  { id: 'TAG-009', name: '企业客户', status: 'enabled', memberCount: 27, creator: 'Luna', createdAt: '2026-07-18 14:26' },
  { id: 'TAG-010', name: '生日月会员', status: 'enabled', memberCount: 63, creator: 'Leo', createdAt: '2026-07-17 10:52' },
  { id: 'TAG-011', name: '低频待唤醒', status: 'disabled', memberCount: 14, creator: 'Ivy', createdAt: '2026-07-16 17:44' },
  { id: 'TAG-012', name: '自带杯用户', status: 'enabled', memberCount: 35, creator: 'Sean', createdAt: '2026-07-15 12:38' },
]);

const activeGroupId = ref('level');
const groupKeyword = ref('');
const tagKeyword = ref('');
const currentPage = ref(1);
const editingGroupId = ref<string | null>(null);
const editingName = ref('');
const addTagModalVisible = ref(false);
const newTagName = ref('');
const loading = ref(false);

const activeGroup = computed(() =>
  groups.value.find((group) => group.id === activeGroupId.value) ?? groups.value[0]
);
const visibleGroups = computed(() => {
  const keyword = groupKeyword.value.trim().toLowerCase();
  return groups.value.filter((group) => group.name.toLowerCase().includes(keyword));
});
const filteredTags = computed(() => {
  const keyword = tagKeyword.value.trim().toLowerCase();
  return tags.value.filter((tag) =>
    !keyword ||
    tag.id.toLowerCase().includes(keyword) ||
    tag.name.toLowerCase().includes(keyword)
  );
});
const visibleTags = computed(() =>
  filteredTags.value.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize)
);

const columns = [
  { title: '标签 ID', dataIndex: 'id', width: 120 },
  { title: '标签名称', dataIndex: 'name', width: 160 },
  { title: '状态', dataIndex: 'status', width: 110, slotName: 'status' },
  { title: '标签人数', dataIndex: 'memberCount', width: 110 },
  { title: '创建人', dataIndex: 'creator', width: 100 },
  { title: '创建时间', dataIndex: 'createdAt', width: 170 },
  { title: '操作', width: 140, fixed: 'right', slotName: 'actions' },
];

function selectGroup(group: TagGroup) {
  if (!group.disabled) activeGroupId.value = group.id;
}

function beginEdit(group: TagGroup) {
  editingGroupId.value = group.id;
  editingName.value = group.name;
}

function saveGroupName() {
  const name = editingName.value.trim();
  if (!editingGroupId.value || !name) return;
  groups.value = groups.value.map((group) =>
    group.id === editingGroupId.value ? { ...group, name } : group
  );
  editingGroupId.value = null;
  Message.success('标签组名称已更新');
}

function deleteGroup(groupId: string) {
  groups.value = groups.value.filter((group) => group.id !== groupId);
  if (activeGroupId.value === groupId) {
    activeGroupId.value = groups.value.find((group) => !group.disabled)?.id ?? '';
  }
  Message.success('标签组已删除');
}

function addGroup() {
  const next = groups.value.length + 1;
  const group = { id: `group-${Date.now()}`, name: `新标签组 ${next}` };
  groups.value.push(group);
  activeGroupId.value = group.id;
}

function addTag() {
  const name = newTagName.value.trim();
  if (!name) return;
  const next = tags.value.length + 1;
  tags.value.unshift({
    id: `TAG-${String(next).padStart(3, '0')}`,
    name,
    status: 'enabled',
    memberCount: 0,
    creator: 'Nink',
    createdAt: '2026-07-30 10:00',
  });
  currentPage.value = 1;
  newTagName.value = '';
  addTagModalVisible.value = false;
  Message.success('标签已添加');
}

function closeAddTagModal() {
  addTagModalVisible.value = false;
  newTagName.value = '';
}

function deleteTag(tagId: string) {
  tags.value = tags.value.filter((tag) => tag.id !== tagId);
  Message.success('标签已删除');
}

function refresh() {
  loading.value = true;
  window.setTimeout(() => {
    loading.value = false;
    Message.success('标签数据已刷新');
  }, 500);
}

function handleTagSearch(value: string) {
  tagKeyword.value = value;
  currentPage.value = 1;
}
</script>

<template>
  <div class="sb-tag-list-page">
    <header class="sb-tag-list-page__header">
      <div class="sb-tag-list-page__title">
        <span>客户标签</span>
        <a-tooltip content="用于维护客户标签组和标签数据">
          <IconInfoCircle aria-label="客户标签说明" />
        </a-tooltip>
      </div>
      <div class="sb-tag-list-page__header-actions">
        <a-button type="primary" @click="Message.info('已触发全局操作')">
          <template #icon><IconUpload /></template>
          全局操作
        </a-button>
        <a-button type="outline" @click="Message.info('已触发核心操作')">
          <template #icon><IconUpload /></template>
          核心操作
        </a-button>
      </div>
    </header>

    <section class="sb-tag-list-page__card">
      <aside class="sb-tag-list-page__sidebar">
        <h2>标签组</h2>
        <div class="sb-tag-list-page__group-search">
          <a-input v-model="groupKeyword" placeholder="请输入内容" allow-clear>
            <template #prefix><IconSearch /></template>
          </a-input>
          <a-button aria-label="添加标签组" @click="addGroup">
            <template #icon><IconPlus /></template>
          </a-button>
        </div>
        <div class="sb-tag-list-page__groups">
          <div
            v-for="group in visibleGroups"
            :key="group.id"
            :class="[
              'sb-tag-list-page__group',
              { 'is-active': group.id === activeGroupId, 'is-disabled': group.disabled },
            ]"
            role="button"
            :tabindex="group.disabled ? -1 : 0"
            :aria-disabled="group.disabled"
            :aria-current="group.id === activeGroupId ? 'true' : undefined"
            @click="selectGroup(group)"
            @keydown.enter.prevent="selectGroup(group)"
            @keydown.space.prevent="selectGroup(group)"
          >
            <span class="sb-tag-list-page__group-name">{{ group.name }}</span>
            <span
              v-if="!group.disabled"
              class="sb-tag-list-page__group-actions"
              @click.stop
            >
              <a-popover
                trigger="click"
                position="top"
                :popup-visible="editingGroupId === group.id"
                @popup-visible-change="(visible: boolean) => visible ? beginEdit(group) : editingGroupId = null"
              >
                <a-button
                  class="sb-tag-list-page__group-action"
                  type="text"
                  size="mini"
                  :aria-label="`编辑${group.name}`"
                  @click="beginEdit(group)"
                >
                  <template #icon><IconEdit /></template>
                </a-button>
                <template #content>
                  <div class="sb-tag-list-page__edit-popover">
                    <strong>编辑名称</strong>
                    <a-input
                      v-model="editingName"
                      placeholder="请输入标签组名称"
                      @press-enter="saveGroupName"
                    />
                    <div>
                      <a-button size="mini" @click="editingGroupId = null">取消</a-button>
                      <a-button
                        size="mini"
                        type="primary"
                        :disabled="!editingName.trim()"
                        @click="saveGroupName"
                      >
                        确认
                      </a-button>
                    </div>
                  </div>
                </template>
              </a-popover>
              <a-popconfirm
                position="top"
                title="确认删除标签组？"
                content="该组下包含标签，删除后组内标签将被一并删除，此操作不可恢复。"
                ok-text="确认"
                cancel-text="取消"
                type="warning"
                @ok="deleteGroup(group.id)"
              >
                <a-button
                  class="sb-tag-list-page__group-action"
                  type="text"
                  size="mini"
                  :aria-label="`删除${group.name}`"
                >
                  <template #icon><IconDelete /></template>
                </a-button>
              </a-popconfirm>
            </span>
          </div>
        </div>
      </aside>

      <div class="sb-tag-list-page__content">
        <div class="sb-tag-list-page__content-title">
          <span>{{ activeGroup?.name ?? '标签组名称' }}</span>
          <a-tooltip content="当前标签组中的标签数据">
            <IconInfoCircle aria-label="标签组说明" />
          </a-tooltip>
        </div>

        <div class="sb-tag-list-page__toolbar">
          <div class="sb-tag-list-page__toolbar-left">
            <a-button @click="addTagModalVisible = true">
              <template #icon><IconPlus /></template>
              添加标签
            </a-button>
            <a-button @click="Message.info('已触发标签导入')">
              <template #icon><IconUpload /></template>
              导入
            </a-button>
            <a-dropdown>
              <a-button>更多 <IconDown /></a-button>
              <template #content>
                <a-doption @click="Message.info('已批量停用')">批量停用</a-doption>
                <a-doption @click="Message.info('已导出标签')">导出标签</a-doption>
              </template>
            </a-dropdown>
          </div>
          <div class="sb-tag-list-page__toolbar-right">
            <a-input
              :model-value="tagKeyword"
              placeholder="请输入标签名"
              allow-clear
              @update:model-value="handleTagSearch"
            >
              <template #prefix><IconSearch /></template>
            </a-input>
            <a-button aria-label="列设置" @click="Message.info('列设置')">
              <template #icon><IconSettings /></template>
            </a-button>
            <a-button aria-label="刷新" :loading="loading" @click="refresh">
              <template #icon><IconRefresh /></template>
            </a-button>
          </div>
        </div>

        <div class="sb-tag-list-page__table">
          <a-table
            row-key="id"
            :columns="columns"
            :data="visibleTags"
            :pagination="false"
            :loading="loading"
            :bordered="false"
            :scroll="{ x: 910 }"
          >
            <template #status="{ record }">
              <a-tag :color="record.status === 'enabled' ? 'green' : 'gray'">
                {{ record.status === 'enabled' ? '已启用' : '已停用' }}
              </a-tag>
            </template>
            <template #actions="{ record }">
              <div class="sb-tag-list-page__row-actions">
                <a-button type="text" size="mini" @click="Message.info(`管理标签：${record.name}`)">
                  管理
                </a-button>
                <a-popconfirm
                  position="top"
                  title="确认删除标签？"
                  content="删除后，该标签将从当前标签组中移除。"
                  ok-text="确认"
                  cancel-text="取消"
                  type="warning"
                  @ok="deleteTag(record.id)"
                >
                  <a-button type="text" size="mini">删除</a-button>
                </a-popconfirm>
              </div>
            </template>
          </a-table>
        </div>

        <div class="sb-tag-list-page__pagination">
          <a-pagination
            v-model:current="currentPage"
            :total="filteredTags.length"
            :page-size="pageSize"
            show-total
            show-jumper
          />
        </div>
      </div>
    </section>

    <a-modal
      v-model:visible="addTagModalVisible"
      title-align="start"
      :ok-button-props="{ disabled: !newTagName.trim() }"
      @ok="addTag"
      @cancel="closeAddTagModal"
    >
      <template #title>添加标签</template>
      <div class="sb-tag-list-page__modal-form">
        <label>
          <span>标签名称</span>
          <a-input
            v-model="newTagName"
            placeholder="请输入标签名称"
            allow-clear
            @press-enter="addTag"
          />
        </label>
      </div>
    </a-modal>
  </div>
</template>
