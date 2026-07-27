<script setup lang="ts">
import { ref } from 'vue';
import {
  IconDown,
  IconPlus,
  IconRefresh,
  IconSearch,
  IconSettings,
  IconUpload,
} from '@sbux/starbucks-design-vue/icon';

// 1:1 还原 Figma 2001:8193「客户标签」页
const C = {
  brand: '#00754a',
  brandLight: '#e6f7f1',
  fill: '#e8e8e8',
  border: '#e8e8e8',
  text1: 'rgba(0,0,0,0.9)',
  text4: 'rgba(0,0,0,0.26)',
};

const active = ref(2);
const groups = ['标签名称', '标签组名称', '标签组名称', '标签组名称', '标签组名称', '标签组名称'];

const columns = [
  { title: '标签ID', dataIndex: 'id' },
  { title: '标签名称', dataIndex: 'name' },
  { title: '状态', dataIndex: 'status', slotName: 'status' },
  { title: '标签人数', dataIndex: 'count' },
  { title: '创建人', dataIndex: 'creator' },
  { title: '创建时间', dataIndex: 'time' },
  { title: '操作', dataIndex: 'op', slotName: 'op' },
];

const data = [56, 48, 32, 22, 10].map((count, i) => ({
  key: i,
  id: '项目名称',
  name: '项目名称',
  count,
  creator: 'Nink',
  time: '项目名称',
}));

function selectGroup(i: number, disabled: boolean) {
  if (!disabled) active.value = i;
}
</script>

<template>
  <div :style="{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '1000px', background: '#fff', color: C.text1 }">
    <!-- 页头 1804:5414 -->
    <div style="display: flex; align-items: center; justify-content: space-between; min-height: 32px">
      <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 16px; font-weight: 600">
        客户标签 <span :style="{ color: 'rgba(0,0,0,0.4)', fontSize: '16px' }">ⓘ</span>
      </span>
      <a-space>
        <a-button><template #icon><IconUpload /></template>全局操作</a-button>
        <a-button type="primary"><template #icon><IconUpload /></template>核心操作</a-button>
      </a-space>
    </div>

    <!-- 两栏卡片 2001:8202 -->
    <div :style="{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: '6px', overflow: 'hidden' }">
      <!-- 左侧 SidePanel 2001:8203 -->
      <div
        :style="{ width: '268px', flex: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: '12px 8px', borderRight: `1px solid ${C.border}` }"
      >
        <div style="padding: 0 8px; font-size: 14px; font-weight: 600; line-height: 22px">标签组</div>
        <div style="display: flex; gap: 8px; align-items: center; padding: 0 8px">
          <a-input placeholder="请输入内容" allow-clear :style="{ width: '196px' }">
            <template #prefix><IconSearch /></template>
          </a-input>
          <a-button :style="{ width: '32px', height: '32px', padding: '0', background: C.fill, border: 'none' }">
            <template #icon><IconPlus /></template>
          </a-button>
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px; padding: 0 8px">
          <div
            v-for="(g, i) in groups"
            :key="i"
            @click="selectGroup(i, i === 3)"
            :style="{
              display: 'flex', alignItems: 'center', height: '32px', padding: '0 8px', borderRadius: '4px',
              fontSize: '14px', lineHeight: '22px', cursor: i === 3 ? 'not-allowed' : 'pointer',
              color: i === 3 ? C.text4 : i === active ? C.brand : C.text1,
              background: i === active ? C.brandLight : 'transparent',
            }"
          >
            {{ g }}
          </div>
        </div>
      </div>

      <!-- 右侧主区 2001:8217 -->
      <div style="flex: 1; min-width: 0; padding: 12px 16px; display: flex; flex-direction: column; gap: 12px">
        <div style="display: inline-flex; align-items: center; gap: 4px; font-size: 14px; font-weight: 600">
          标签组名称 <span :style="{ color: 'rgba(0,0,0,0.4)' }">ⓘ</span>
        </div>

        <!-- 工具栏 2001:8225 -->
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px">
          <a-space>
            <a-button type="primary"><template #icon><IconPlus /></template>添加标签</a-button>
            <a-button><template #icon><IconUpload /></template>导入</a-button>
            <a-dropdown>
              <a-button>更多 <IconDown /></a-button>
              <template #content><a-doption>批量删除</a-doption></template>
            </a-dropdown>
          </a-space>
          <a-space>
            <a-input placeholder="请输入内容" allow-clear :style="{ width: '250px' }">
              <template #prefix><IconSearch /></template>
            </a-input>
            <a-button><template #icon><IconSettings /></template></a-button>
            <a-button><template #icon><IconRefresh /></template></a-button>
          </a-space>
        </div>

        <!-- 表格 2001:8237 -->
        <a-table :columns="columns" :data="data" :pagination="false" :bordered="{ headerCell: true, cell: true }">
          <template #status>
            <a-tag color="green">我是标签</a-tag>
          </template>
          <template #op>
            <a-space :size="16">
              <a :style="{ color: C.brand }">管理</a>
              <a :style="{ color: C.brand }">删除</a>
            </a-space>
          </template>
        </a-table>

        <!-- 分页 2001:8245 -->
        <div style="display: flex; justify-content: flex-end">
          <a-pagination :total="480" :page-size="20" :current="1" show-total show-page-size show-jumper />
        </div>
      </div>
    </div>
  </div>
</template>
