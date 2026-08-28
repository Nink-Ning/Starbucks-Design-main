<template>
  <Teleport to="[data-template-action-host='tree-filter-list']">
    <div class="sb-tree-filter-list-page__breadcrumb-actions">
      <Select v-model="viewMode" aria-label="页面状态" style="width: 120px">
        <Option value="normal">Normal</Option>
        <Option value="loading">Loading</Option>
        <Option value="empty">Empty</Option>
        <Option value="error">Error</Option>
      </Select>
    </div>
  </Teleport>

  <div class="sb-tree-filter-list-page sb-template-page-surface">
    <div :class="['sb-tree-filter-list-page__layout', { 'is-sidebar-collapsed': sidebarCollapsed }]">
      <aside class="sb-tree-filter-list-page__sidebar">
        <div class="sb-tree-filter-list-page__sidebar-header">
          <h2 v-if="!sidebarCollapsed">区域筛选</h2>
          <Tooltip :content="sidebarCollapsed ? '展开区域筛选' : '折叠区域筛选'">
            <Button
              type="text"
              shape="square"
              :aria-label="sidebarCollapsed ? '展开区域筛选' : '折叠区域筛选'"
              @click="sidebarCollapsed = !sidebarCollapsed"
            >
              <template #icon>
                <IconDoubleRight v-if="sidebarCollapsed" />
                <IconDoubleLeft v-else />
              </template>
            </Button>
          </Tooltip>
        </div>

        <div v-if="sidebarCollapsed" class="sb-tree-filter-list-page__sidebar-summary">
          <strong>{{ treeTypeLabels[query.treeType] }}</strong>
          <span>已选择 {{ activeSelectedCount }} 个区域</span>
          <Tag v-if="isTreeDraftDirty" color="arcoblue">待查询</Tag>
        </div>

        <template v-else>
          <div class="sb-tree-filter-list-page__tree-type">
            <RadioGroup v-model="activeTreeType" type="button" @change="handleTreeTypeChange">
              <Radio value="operation">运营区域</Radio>
              <Radio value="geography">地理区域</Radio>
            </RadioGroup>
          </div>
          <div
            ref="treeScrollRef"
            class="sb-tree-filter-list-page__tree-scroll"
            @scroll="handleTreeScroll"
          >
            <Result
              v-if="viewMode === 'error'"
              status="error"
              title="区域数据加载失败"
              subtitle="当前为本地错误状态演示。"
            >
              <template #extra>
                <Button type="primary" @click="viewMode = 'normal'">重试</Button>
              </template>
            </Result>
            <Empty v-else-if="viewMode === 'empty'" description="暂无区域数据" />
            <Spin v-else :loading="isLoading">
              <Tree
                :checkable="true"
                :check-strictly="false"
                show-line
                :data="currentTreeData"
                :checked-keys="currentTreeState.checkedKeys"
                :expanded-keys="currentTreeState.expandedKeys"
                @check="handleTreeCheck"
                @expand="handleTreeExpand"
              >
                <template #switcher-icon="_node, { isLeaf }">
                  <IconDown v-if="!isLeaf" />
                  <IconDriveFile v-else />
                </template>
              </Tree>
            </Spin>
          </div>
        </template>
      </aside>

      <main class="sb-tree-filter-list-page__content">
        <section
          ref="filterModuleRef"
          class="sb-tree-filter-list-page__module sb-tree-filter-list-page__filter-module"
        >
          <FilterBar
            :fields="fields"
            :model-value="draftFilterValues"
            :active-values="activeFilterValues"
            :default-value="initialFilterValues"
            :columns="filterColumns"
            :default-visible-count="filterVisibleCount"
            submit-mode="manual"
            :loading="isLoading"
            @values-change="handleValuesChange"
            @update:active-values="handleActiveValuesChange"
            @reset="handleReset"
          />
        </section>

        <section class="sb-tree-filter-list-page__module sb-tree-filter-list-page__table-module">
          <div class="sb-tree-filter-list-page__toolbar">
            <div class="sb-tree-filter-list-page__toolbar-left">
              <h2 class="sb-tree-filter-list-page__list-title">门店列表</h2>
            </div>
            <div class="sb-tree-filter-list-page__toolbar-right">
              <Tooltip content="刷新">
                <Button
                  type="outline"
                  shape="square"
                  aria-label="刷新"
                  :loading="requestLoading"
                  @click="refreshData"
                >
                  <template #icon><IconRefresh /></template>
                </Button>
              </Tooltip>
            </div>
          </div>

          <Result
            v-if="viewMode === 'error'"
            status="error"
            title="门店数据加载失败"
            subtitle="当前为本地错误状态演示。"
          >
            <template #extra>
              <Button type="primary" @click="viewMode = 'normal'">返回正常状态</Button>
            </template>
          </Result>
          <div v-else class="sb-tree-filter-list-page__table-scroll">
            <Table
              row-key="id"
              :columns="columns"
              :data="pageData"
              :loading="isLoading"
              :pagination="false"
              :scroll="{ x: 1540 }"
              :expandable="expandable"
              show-empty-tree
              v-model:expandedKeys="expandedRowKeys"
            >
              <template #storeStatus="{ record }">
                <Tag :color="statusColor(record.storeStatus)">{{ statusLabel(record.storeStatus) }}</Tag>
              </template>
              <template #businessStatus="{ record }">{{ businessStatusLabel(record.businessStatus) }}</template>
              <template #storeType="{ record }">{{ typeLabel(record.storeType) }}</template>
              <template #channel="{ record }">{{ channelLabel(record.channel) }}</template>
              <template #actions>
                <Space class="sb-tree-filter-list-page__row-actions" :size="4">
                  <Button type="text" size="mini">查看</Button>
                  <Button type="text" size="mini">编辑</Button>
                  <Button type="text" size="mini" aria-label="更多操作">
                    <template #icon><IconMore /></template>
                  </Button>
                </Space>
              </template>
              <template #empty>
                <Empty description="暂无符合条件的门店数据" />
              </template>
            </Table>
          </div>

          <div class="sb-tree-filter-list-page__pagination">
            <Pagination
              :total="filteredRows.length"
              :page-size="pageSize"
              :current="query.page"
              show-total
              show-jumper
              @change="handlePageChange"
            />
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { FilterBar } from '@sbux/starbucks-design-vue';
import type { FilterFieldSchema, FilterValue } from '@sbux/starbucks-design-vue';
import {
  businessStatusOptions,
  channelOptions,
  cloneTreeStateByType,
  filterStoreRows,
  getFilterDefaultVisibleCount,
  getRowKeys,
  getSelectedLeafKeys,
  initialStoreRows,
  paginateRows,
  sameStringArray,
  statusOptions,
  storeTypeOptions,
  treeDataByType,
  treeTypeLabels,
} from './tree-filter-list.shared';
import type {
  StoreRecord,
  StoreStatus,
  TreeDraftState,
  TreeFilterListQuery,
  TreeType,
} from './tree-filter-list.shared';
import {
  IconDown,
  IconDownCircle,
  IconDoubleLeft,
  IconDoubleRight,
  IconDriveFile,
  IconMore,
  IconRefresh,
  IconRightCircle,
} from '@sbux/starbucks-design-vue/icon';

type ViewMode = 'normal' | 'loading' | 'empty' | 'error';

const initialFilterValues: FilterValue = {};
const filterColumns = { xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 };
const pageSize = 6;

const fields: FilterFieldSchema[] = [
  {
    type: 'input',
    name: 'keyword',
    label: '关键词',
    placeholder: '搜索 Global ID、门店编号或名称',
    allowClear: true,
    priority: 0,
  },
  {
    type: 'select',
    name: 'status',
    label: '门店状态',
    placeholder: '请选择门店状态',
    allowClear: true,
    options: statusOptions,
    priority: 1,
  },
  {
    type: 'select',
    name: 'businessStatus',
    label: '业务状态',
    placeholder: '请选择业务状态',
    allowClear: true,
    options: businessStatusOptions,
    priority: 2,
  },
  {
    type: 'multiSelect',
    name: 'storeType',
    label: '门店类型',
    placeholder: '请选择门店类型',
    allowClear: true,
    maxTagCount: 1,
    options: storeTypeOptions,
    priority: 3,
  },
  {
    type: 'select',
    name: 'channel',
    label: '渠道',
    placeholder: '请选择渠道',
    allowClear: true,
    options: channelOptions,
    priority: 4,
  },
  {
    type: 'dateRange',
    name: 'openingDate',
    label: '开业日期',
    placeholder: ['开始日期', '结束日期'],
    allowClear: true,
    priority: 5,
  },
];

const stores = ref<StoreRecord[]>(initialStoreRows);
const filterVisibleCount = ref(3);
const filterModuleRef = ref<HTMLElement | null>(null);
let filterResizeObserver: ResizeObserver | undefined;
const draftFilterValues = ref<FilterValue>({ ...initialFilterValues });
const activeFilterValues = ref<FilterValue>({ ...initialFilterValues });
const treeDraft = ref<Record<TreeType, TreeDraftState>>(cloneTreeStateByType());
const treeActive = ref<Record<TreeType, TreeDraftState>>(cloneTreeStateByType());
const activeTreeType = ref<TreeType>('operation');
const query = ref<TreeFilterListQuery>({
  treeType: 'operation',
  treeSelectedKeys: [],
  filterValues: initialFilterValues,
  page: 1,
  pageSize,
});
const viewMode = ref<ViewMode>('normal');
const requestLoading = ref(false);
const expandedRowKeys = ref<string[]>(['store-001']);
const sidebarCollapsed = ref(false);
const resetting = ref(false);
const treeScrollRef = ref<HTMLElement | null>(null);

const updateFilterVisibleCount = () => {
  const filterBar = filterModuleRef.value?.querySelector<HTMLElement>('.sbux-filter-bar');
  if (filterBar) {
    filterVisibleCount.value = getFilterDefaultVisibleCount(filterBar.clientWidth);
  }
};

onMounted(async () => {
  await nextTick();
  updateFilterVisibleCount();
  const filterBar = filterModuleRef.value?.querySelector<HTMLElement>('.sbux-filter-bar');
  if (filterBar) {
    filterResizeObserver = new ResizeObserver(updateFilterVisibleCount);
    filterResizeObserver.observe(filterBar);
  }
});

onBeforeUnmount(() => filterResizeObserver?.disconnect());

const isLoading = computed(() => viewMode.value === 'loading' || requestLoading.value);
const currentTreeState = computed(() => treeDraft.value[activeTreeType.value]);
const currentTreeData = computed(() => treeDataByType[activeTreeType.value]);
const filteredRows = computed(() => {
  if (viewMode.value === 'empty') return [];
  return filterStoreRows(stores.value, query.value.treeType, query.value.treeSelectedKeys, query.value.filterValues);
});
const pageData = computed(() => paginateRows(filteredRows.value, query.value.page, query.value.pageSize));
const draftTreeSelectedKeys = computed(() =>
  getSelectedLeafKeys(
    currentTreeData.value,
    currentTreeState.value.checkedKeys,
    currentTreeState.value.halfCheckedKeys
  )
);
const activeSelectedCount = computed(() => treeActive.value[query.value.treeType].checkedKeys.length);
const isTreeDraftDirty = computed(
  () =>
    activeTreeType.value !== query.value.treeType ||
    !sameStringArray(draftTreeSelectedKeys.value, treeActive.value[query.value.treeType].checkedKeys)
);

const expandable = {
  icon: (expanded: boolean) => h(expanded ? IconDownCircle : IconRightCircle),
};
const columns = [
  { title: 'Global ID', dataIndex: 'globalId', width: 130, fixed: 'left' },
  { title: '门店编号', dataIndex: 'storeNumber', width: 120, fixed: 'left' },
  { title: '门店名称', dataIndex: 'name', width: 230 },
  { title: '门店状态', dataIndex: 'storeStatus', width: 120, slotName: 'storeStatus' },
  { title: '业务状态', dataIndex: 'businessStatus', width: 120, slotName: 'businessStatus' },
  { title: '地理区域', dataIndex: 'geography', width: 140 },
  { title: '运营区域', dataIndex: 'operationRegion', width: 140 },
  { title: '门店类型', dataIndex: 'storeType', width: 120, slotName: 'storeType' },
  { title: '渠道', dataIndex: 'channel', width: 100, slotName: 'channel' },
  { title: '开业日期', dataIndex: 'openingDate', width: 130 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 170 },
  { title: '操作', width: 150, fixed: 'right', slotName: 'actions' },
];

watch(pageData, (nextRows) => {
  const availableKeys = new Set(getRowKeys(nextRows));
  expandedRowKeys.value = expandedRowKeys.value.filter((key) => availableKeys.has(key));
});

watch(activeTreeType, async () => {
  await nextTick();
  if (treeScrollRef.value) treeScrollRef.value.scrollTop = currentTreeState.value.scrollTop;
});

function updateQuery(values: FilterValue) {
  const nextTreeState = currentTreeState.value;
  const nextSelectedKeys = getSelectedLeafKeys(
    currentTreeData.value,
    nextTreeState.checkedKeys,
    nextTreeState.halfCheckedKeys
  );
  const nextQuery: TreeFilterListQuery = {
    treeType: activeTreeType.value,
    treeSelectedKeys: nextSelectedKeys,
    filterValues: values,
    page: 1,
    pageSize,
  };
  activeFilterValues.value = values;
  treeActive.value = {
    ...treeActive.value,
    [activeTreeType.value]: {
      ...nextTreeState,
      checkedKeys: nextSelectedKeys,
      halfCheckedKeys: [],
    },
  };
  query.value = nextQuery;
  requestLoading.value = true;
  window.setTimeout(() => (requestLoading.value = false), 550);
}

function handleReset() {
  resetting.value = true;
  treeDraft.value = cloneTreeStateByType();
  treeActive.value = cloneTreeStateByType();
  stores.value = initialStoreRows;
  activeTreeType.value = 'operation';
  draftFilterValues.value = { ...initialFilterValues };
  activeFilterValues.value = { ...initialFilterValues };
  query.value = {
    treeType: 'operation',
    treeSelectedKeys: [],
    filterValues: initialFilterValues,
    page: 1,
    pageSize,
  };
  expandedRowKeys.value = ['store-001'];
  viewMode.value = 'normal';
  window.setTimeout(() => (resetting.value = false), 0);
}

function handleValuesChange(values: FilterValue) {
  draftFilterValues.value = values;
}

function handleActiveValuesChange(values: FilterValue) {
  if (resetting.value) return;
  updateQuery(values);
}

function handleTreeCheck(checkedKeys: Array<string | number>, event: { halfCheckedKeys?: Array<string | number> }) {
  treeDraft.value = {
    ...treeDraft.value,
    [activeTreeType.value]: {
      ...currentTreeState.value,
      checkedKeys: checkedKeys.map(String),
      halfCheckedKeys: (event.halfCheckedKeys ?? []).map(String),
    },
  };
}

function handleTreeExpand(expandedKeys: Array<string | number>) {
  treeDraft.value = {
    ...treeDraft.value,
    [activeTreeType.value]: {
      ...currentTreeState.value,
      expandedKeys: expandedKeys.map(String),
    },
  };
}

function handleTreeScroll(event: Event) {
  const scrollTop = (event.currentTarget as HTMLElement).scrollTop;
  treeDraft.value = {
    ...treeDraft.value,
    [activeTreeType.value]: { ...currentTreeState.value, scrollTop },
  };
}

function handleTreeTypeChange(nextType: string | number) {
  if (nextType !== 'operation' && nextType !== 'geography') return;
  activeTreeType.value = nextType;
}

function handlePageChange(page: number) {
  query.value = { ...query.value, page };
}

function refreshData() {
  requestLoading.value = true;
  window.setTimeout(() => (requestLoading.value = false), 700);
}

function statusLabel(status: StoreStatus) {
  return statusOptions.find((option) => option.value === status)?.label ?? status;
}

function statusColor(status: StoreStatus) {
  if (status === 'open') return 'green';
  if (status === 'preparing') return 'arcoblue';
  return 'gray';
}

function typeLabel(type: StoreRecord['storeType']) {
  return storeTypeOptions.find((option) => option.value === type)?.label ?? type;
}

function businessStatusLabel(status: StoreRecord['businessStatus']) {
  return businessStatusOptions.find((option) => option.value === status)?.label ?? status;
}

function channelLabel(channel: StoreRecord['channel']) {
  return channelOptions.find((option) => option.value === channel)?.label ?? channel;
}
</script>
