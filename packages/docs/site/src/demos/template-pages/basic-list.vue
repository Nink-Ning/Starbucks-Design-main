<template>
  <Teleport to="[data-template-action-host='basic-list']">
    <div class="sb-basic-list-page__breadcrumb-actions">
      <Select v-model="viewMode" aria-label="页面状态" style="width: 120px">
        <Option value="normal">Normal</Option>
        <Option value="loading">Loading</Option>
        <Option value="empty">Empty</Option>
        <Option value="error">Error</Option>
      </Select>
      <Button type="primary" @click="createModalVisible = true">
        <template #icon><IconPlus /></template>
        新建门店
      </Button>
    </div>
  </Teleport>

  <div class="sb-basic-list-page sb-template-page-surface">
    <section class="sb-basic-list-page__module sb-basic-list-page__table-module">
      <TableToolbar
        :selected-count="selectedRowKeys.length"
        :quick-filters="quickFilters"
        :quick-filter-values="quickFilterValues"
        :operation-actions="operationActions"
        :more-actions="moreActions"
        :table-tools="{
          export: true,
          columnSettings: true,
          refresh: { loading: refreshing },
        }"
        @update:quick-filter-values="quickFilterValues = $event"
        @operation="handleToolbarOperation"
        @export="downloadCsv(visibleStores)"
        @column-settings="columnModalVisible = true"
        @refresh="refreshData"
      />

      <Result
        v-if="viewMode === 'error'"
        status="error"
        title="门店数据加载失败"
      >
        <template #subtitle>当前为本地错误状态演示，可切换页面状态或刷新恢复。</template>
        <template #extra>
          <Button type="primary" @click="viewMode = 'normal'">返回正常状态</Button>
        </template>
      </Result>

      <template v-else>
        <div ref="tableViewport" class="sb-basic-list-page__table-viewport">
          <Table
            row-key="id"
            :columns="visibleColumns"
            :data="pageData"
            :loading="isLoading"
            :pagination="false"
            :scroll="{ x: 1160, y: tableBodyHeight }"
            :row-selection="rowSelection"
            v-model:selectedKeys="selectedRowKeys"
          >
            <template #status="{ record }">
              <Tag :color="statusColor(record.status)">{{ statusLabel(record.status) }}</Tag>
            </template>
            <template #type="{ record }">{{ typeLabel(record.type) }}</template>
            <template #city="{ record }">{{ record.region }} / {{ record.city }}</template>
            <template #actions="{ record }">
              <Space class="sb-basic-list-page__row-actions sbux-table-row-actions" :size="4">
                <Button type="text" size="mini" :aria-label="`查看 ${record.name}`">查看</Button>
                <Button type="text" size="mini" :aria-label="`编辑 ${record.name}`">编辑</Button>
                <Dropdown @select="handleRowAction($event, record)">
                  <Button type="text" size="mini" :aria-label="`${record.name} 更多操作`"><template #icon><IconMore /></template></Button>
                  <template #content>
                    <Doption>复制门店</Doption>
                    <Doption>停用门店</Doption>
                  </template>
                </Dropdown>
              </Space>
            </template>
            <template #empty>
              <Empty description="暂无符合条件的门店" />
            </template>
          </Table>
        </div>
        <div class="sb-basic-list-page__pagination">
          <Pagination
            :total="total"
            :page-size="pageSize"
            :current="current"
            show-total
            show-jumper
            @change="handlePageChange"
          />
        </div>
      </template>
    </section>

    <Modal
      v-model:visible="columnModalVisible"
      title-align="start"
      @ok="columnModalVisible = false"
      @cancel="columnModalVisible = false"
    >
      <template #title>列设置</template>
      <CheckboxGroup v-model="visibleColumnKeys" direction="vertical">
        <Space direction="vertical" :size="12">
          <Checkbox
            v-for="column in columnOptions"
            :key="column.key"
            :value="column.key"
            :disabled="column.fixed"
          >
            {{ column.label }}
          </Checkbox>
        </Space>
      </CheckboxGroup>
    </Modal>

    <Modal
      v-model:visible="createModalVisible"
      title-align="start"
      @ok="createStore"
      @cancel="createModalVisible = false"
    >
      <template #title>新建门店</template>
      <div class="sb-basic-list-page__modal-form">
        <label>
          <span>门店名称</span>
          <Input v-model="newStore.name" placeholder="请输入门店名称" />
        </label>
        <label>
          <span>门店编号</span>
          <Input v-model="newStore.code" placeholder="请输入门店编号" />
        </label>
        <label>
          <span>所在城市</span>
          <Select v-model="newStore.cityValue">
            <Option value="shanghai">上海</Option>
            <Option value="hangzhou">杭州</Option>
            <Option value="shenzhen">深圳</Option>
            <Option value="beijing">北京</Option>
          </Select>
        </label>
        <label>
          <span>营业状态</span>
          <Select v-model="newStore.status">
            <Option value="open">营业中</Option>
            <Option value="preparing">筹备中</Option>
            <Option value="closed">已停业</Option>
          </Select>
        </label>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { Modal, TableToolbar } from '@sbux/starbucks-design-vue';
import type {
  TableToolbarAction,
  TableToolbarQuickFilter,
  TableToolbarQuickFilterValues,
} from '@sbux/starbucks-design-vue';
import {
  IconCheckCircle,
  IconCloseCircle,
  IconMore,
  IconMinusCircle,
  IconPlus,
} from '@sbux/starbucks-design-vue/icon';

type StoreStatus = 'open' | 'preparing' | 'closed';
type BatchStatus = Extract<StoreStatus, 'open' | 'closed'>;
type StoreType = 'standard' | 'reserve' | 'delivery';
type ViewMode = 'normal' | 'loading' | 'empty' | 'error';
type ColumnKey = 'code' | 'name' | 'city' | 'type' | 'status' | 'openedAt' | 'manager' | 'updatedAt' | 'actions';

type StoreRecord = {
  id: string;
  code: string;
  name: string;
  region: string;
  city: string;
  cityValue: string;
  type: StoreType;
  status: StoreStatus;
  openedAt: string;
  manager: string;
  updatedAt: string;
};

type NewStoreForm = {
  code: string;
  name: string;
  cityValue: string;
  status: StoreStatus;
};

const appContext = getCurrentInstance()!.appContext;

const statusOptions = [
  { label: '营业中', value: 'open' },
  { label: '筹备中', value: 'preparing' },
  { label: '已停业', value: 'closed' },
];

const typeOptions = [
  { label: '标准店', value: 'standard' },
  { label: '臻选店', value: 'reserve' },
  { label: '外送店', value: 'delivery' },
];

const cityOptions = [
  {
    label: '华东',
    value: 'east',
    children: [
      { label: '上海', value: 'shanghai' },
      { label: '杭州', value: 'hangzhou' },
      { label: '苏州', value: 'suzhou' },
    ],
  },
  {
    label: '华南',
    value: 'south',
    children: [
      { label: '深圳', value: 'shenzhen' },
      { label: '广州', value: 'guangzhou' },
    ],
  },
  {
    label: '华北',
    value: 'north',
    children: [
      { label: '北京', value: 'beijing' },
      { label: '天津', value: 'tianjin' },
    ],
  },
];

const pageSize = 20;
const quickFilters: TableToolbarQuickFilter[] = [
  { type: 'search', name: 'keyword', placeholder: '搜索门店名称或编号' },
];
const operationActions: TableToolbarAction[] = [
  { key: 'open', label: '启用', icon: IconCheckCircle, requiresSelection: true },
  { key: 'closed', label: '停用', icon: IconMinusCircle, requiresSelection: true },
];
const moreActions: TableToolbarAction[] = [
  { key: 'clear', label: '清除选择', icon: IconCloseCircle, requiresSelection: true },
];

const handleRowAction = (key: string, record: StoreRecord) => {
  if (key === 'archive') {
    Modal.warning({
      title: '确认停用门店？',
      content: `将停用“${record.name}”，该操作需要再次确认。`,
      okText: '确认',
      cancelText: '取消',
    });
  }
};

const initialStores: StoreRecord[] = [
  { id: '1', code: 'SH-001', name: '上海静安嘉里中心店', region: '华东', city: '上海', cityValue: 'shanghai', type: 'reserve', status: 'open', openedAt: '2020-05-18', manager: 'Nink', updatedAt: '2026-07-24 10:30' },
  { id: '2', code: 'SH-018', name: '上海虹桥天地店', region: '华东', city: '上海', cityValue: 'shanghai', type: 'standard', status: 'open', openedAt: '2021-09-12', manager: 'Kim', updatedAt: '2026-07-23 15:20' },
  { id: '3', code: 'HZ-011', name: '杭州西湖银泰店', region: '华东', city: '杭州', cityValue: 'hangzhou', type: 'standard', status: 'preparing', openedAt: '2026-08-10', manager: 'Alex', updatedAt: '2026-07-22 09:15' },
  { id: '4', code: 'SZ-006', name: '深圳湾万象城店', region: '华南', city: '深圳', cityValue: 'shenzhen', type: 'delivery', status: 'open', openedAt: '2022-03-08', manager: 'Mia', updatedAt: '2026-07-21 18:00' },
  { id: '5', code: 'BJ-009', name: '北京国贸商城店', region: '华北', city: '北京', cityValue: 'beijing', type: 'reserve', status: 'open', openedAt: '2019-11-01', manager: 'Jade', updatedAt: '2026-07-21 13:48' },
  { id: '6', code: 'GZ-013', name: '广州天河城店', region: '华南', city: '广州', cityValue: 'guangzhou', type: 'standard', status: 'closed', openedAt: '2018-06-21', manager: 'Owen', updatedAt: '2026-07-20 16:12' },
  { id: '7', code: 'SU-002', name: '苏州中心臻选店', region: '华东', city: '苏州', cityValue: 'suzhou', type: 'reserve', status: 'open', openedAt: '2023-04-15', manager: 'Rita', updatedAt: '2026-07-20 11:06' },
  { id: '8', code: 'TJ-004', name: '天津恒隆广场店', region: '华北', city: '天津', cityValue: 'tianjin', type: 'standard', status: 'preparing', openedAt: '2026-09-01', manager: 'Ben', updatedAt: '2026-07-19 19:35' },
  { id: '9', code: 'SH-027', name: '上海前滩太古里店', region: '华东', city: '上海', cityValue: 'shanghai', type: 'delivery', status: 'open', openedAt: '2024-12-06', manager: 'Luna', updatedAt: '2026-07-18 14:26' },
  { id: '10', code: 'HZ-020', name: '杭州滨江龙湖店', region: '华东', city: '杭州', cityValue: 'hangzhou', type: 'delivery', status: 'closed', openedAt: '2020-10-23', manager: 'Leo', updatedAt: '2026-07-17 10:52' },
  { id: '11', code: 'BJ-021', name: '北京望京凯德店', region: '华北', city: '北京', cityValue: 'beijing', type: 'standard', status: 'open', openedAt: '2021-12-19', manager: 'Ivy', updatedAt: '2026-07-16 17:44' },
  { id: '12', code: 'SZ-015', name: '深圳南山科技园店', region: '华南', city: '深圳', cityValue: 'shenzhen', type: 'delivery', status: 'open', openedAt: '2022-08-28', manager: 'Sean', updatedAt: '2026-07-15 12:38' },
  { id: '13', code: 'GZ-029', name: '广州珠江新城店', region: '华南', city: '广州', cityValue: 'guangzhou', type: 'reserve', status: 'preparing', openedAt: '2026-10-18', manager: 'Tina', updatedAt: '2026-07-14 09:20' },
  { id: '14', code: 'SU-018', name: '苏州工业园区店', region: '华东', city: '苏州', cityValue: 'suzhou', type: 'standard', status: 'open', openedAt: '2023-02-11', manager: 'Mark', updatedAt: '2026-07-13 15:02' },
  { id: '15', code: 'TJ-017', name: '天津滨海文化中心店', region: '华北', city: '天津', cityValue: 'tianjin', type: 'delivery', status: 'closed', openedAt: '2019-07-07', manager: 'Cora', updatedAt: '2026-07-12 13:25' },
  { id: '16', code: 'SH-033', name: '上海徐家汇港汇店', region: '华东', city: '上海', cityValue: 'shanghai', type: 'standard', status: 'open', openedAt: '2017-09-16', manager: 'Will', updatedAt: '2026-07-11 18:16' },
  { id: '17', code: 'HZ-036', name: '杭州武林广场店', region: '华东', city: '杭州', cityValue: 'hangzhou', type: 'standard', status: 'open', openedAt: '2024-05-20', manager: 'Grace', updatedAt: '2026-07-10 16:42' },
  { id: '18', code: 'BJ-035', name: '北京三里屯太古里店', region: '华北', city: '北京', cityValue: 'beijing', type: 'reserve', status: 'open', openedAt: '2020-08-08', manager: 'Eric', updatedAt: '2026-07-09 14:18' },
  { id: '19', code: 'SZ-028', name: '深圳卓悦中心店', region: '华南', city: '深圳', cityValue: 'shenzhen', type: 'delivery', status: 'preparing', openedAt: '2026-11-12', manager: 'Fiona', updatedAt: '2026-07-08 11:36' },
  { id: '20', code: 'GZ-041', name: '广州北京路店', region: '华南', city: '广州', cityValue: 'guangzhou', type: 'standard', status: 'open', openedAt: '2023-06-30', manager: 'Henry', updatedAt: '2026-07-07 09:54' },
];

const columnOptions: Array<{ key: ColumnKey; label: string; fixed?: boolean }> = [
  { key: 'code', label: '门店编号', fixed: true },
  { key: 'name', label: '门店名称', fixed: true },
  { key: 'city', label: '所在城市' },
  { key: 'type', label: '门店类型' },
  { key: 'status', label: '营业状态' },
  { key: 'openedAt', label: '开业日期' },
  { key: 'manager', label: '店长' },
  { key: 'updatedAt', label: '更新时间' },
  { key: 'actions', label: '操作', fixed: true },
];

const allColumns = [
  { title: '门店编号', dataIndex: 'code', width: 120, fixed: 'left' },
  { title: '门店名称', dataIndex: 'name', width: 220, fixed: 'left' },
  { title: '所在城市', dataIndex: 'city', width: 140, slotName: 'city' },
  { title: '门店类型', dataIndex: 'type', width: 120, slotName: 'type' },
  { title: '营业状态', dataIndex: 'status', width: 120, slotName: 'status' },
  { title: '开业日期', dataIndex: 'openedAt', width: 140 },
  { title: '店长', dataIndex: 'manager', width: 120 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 180 },
  { title: '操作', width: 180, fixed: 'right', slotName: 'actions' },
];

const cityByValue = new Map(
  cityOptions.flatMap((group) =>
    (group.children ?? []).map((city) => [city.value, { city: city.label, region: group.label }])
  )
);

const stores = ref<StoreRecord[]>([...initialStores]);
const quickFilterValues = ref<TableToolbarQuickFilterValues>({ keyword: '' });
const selectedRowKeys = ref<string[]>([]);
const current = ref(1);
const viewMode = ref<ViewMode>('normal');
const refreshing = ref(false);
const columnModalVisible = ref(false);
const createModalVisible = ref(false);
const visibleColumnKeys = ref<ColumnKey[]>(columnOptions.map((option) => option.key));
const tableViewport = ref<HTMLElement | null>(null);
const tableBodyHeight = ref(480);
let tableResizeObserver: ResizeObserver | undefined;
const newStore = ref<NewStoreForm>({
  code: '',
  name: '',
  cityValue: 'shanghai',
  status: 'preparing',
});

const rowSelection = { type: 'checkbox', showCheckedAll: true };
const isLoading = computed(() => viewMode.value === 'loading' || refreshing.value);

const visibleColumns = computed(() =>
  allColumns.filter((_, index) => visibleColumnKeys.value.includes(columnOptions[index].key))
);

const visibleStores = computed(() => {
  if (viewMode.value === 'empty') return [];
  const normalizedKeyword = String(quickFilterValues.value.keyword ?? '').trim().toLowerCase();
  if (!normalizedKeyword) return stores.value;
  return stores.value.filter(
    (store) =>
      store.name.toLowerCase().includes(normalizedKeyword) ||
      store.code.toLowerCase().includes(normalizedKeyword)
  );
});

const total = computed(() => visibleStores.value.length);
const pageData = computed(() => visibleStores.value.slice((current.value - 1) * pageSize, current.value * pageSize));

watch([() => quickFilterValues.value.keyword, viewMode], () => {
  current.value = 1;
  selectedRowKeys.value = [];
});

function updateTableBodyHeight() {
  const viewport = tableViewport.value;
  if (!viewport) return;
  const headerHeight = Math.ceil(viewport.querySelector('thead')?.getBoundingClientRect().height ?? 41);
  tableBodyHeight.value = Math.max(160, Math.floor(viewport.clientHeight - headerHeight));
}

function observeTableViewport() {
  tableResizeObserver?.disconnect();
  const viewport = tableViewport.value;
  if (!viewport) return;
  tableResizeObserver = new ResizeObserver(updateTableBodyHeight);
  tableResizeObserver.observe(viewport);
  updateTableBodyHeight();
}

onMounted(observeTableViewport);
onBeforeUnmount(() => tableResizeObserver?.disconnect());
watch(viewMode, async () => {
  await nextTick();
  observeTableViewport();
});

function statusLabel(status: StoreStatus) {
  return statusOptions.find((option) => option.value === status)?.label ?? status;
}

function statusColor(status: StoreStatus) {
  if (status === 'open') return 'green';
  if (status === 'preparing') return 'arcoblue';
  return 'gray';
}

function typeLabel(type: StoreType) {
  return typeOptions.find((option) => option.value === type)?.label ?? type;
}

function handlePageChange(page: number) {
  current.value = page;
}

function changeStatusForSelected(status: StoreStatus) {
  if (selectedRowKeys.value.length === 0) return;
  stores.value = stores.value.map((store) =>
    selectedRowKeys.value.includes(store.id)
      ? { ...store, status, updatedAt: '2026-07-29 09:30' }
      : store
  );
  selectedRowKeys.value = [];
}

function openBatchConfirm(status: BatchStatus) {
  if (selectedRowKeys.value.length === 0) return;
  const action = status === 'open' ? '启用' : '停用';
  Modal.warning(
    {
      title: `确认批量${action}`,
      content: `确认${action}选中的 ${selectedRowKeys.value.length} 家门店？确认后将立即更新本地 Mock 数据中的营业状态。`,
      okText: '确定',
      onOk: () => changeStatusForSelected(status),
    },
    appContext
  );
}

function handleToolbarOperation(key: string) {
  if (key === 'open' || key === 'closed') {
    openBatchConfirm(key);
    return;
  }
  if (key === 'clear') selectedRowKeys.value = [];
}

function refreshData() {
  refreshing.value = true;
  window.setTimeout(() => {
    refreshing.value = false;
  }, 700);
}

function createStore() {
  const cityMeta = cityByValue.get(newStore.value.cityValue) ?? { city: '上海', region: '华东' };
  const nextStore: StoreRecord = {
    id: `${Date.now()}`,
    code: newStore.value.code || `NEW-${stores.value.length + 1}`,
    name: newStore.value.name || '新门店',
    region: cityMeta.region,
    city: cityMeta.city,
    cityValue: newStore.value.cityValue,
    type: 'standard',
    status: newStore.value.status,
    openedAt: '2026-07-29',
    manager: '待分配',
    updatedAt: '2026-07-29 10:00',
  };
  stores.value = [nextStore, ...stores.value];
  createModalVisible.value = false;
  current.value = 1;
  newStore.value = { code: '', name: '', cityValue: 'shanghai', status: 'preparing' };
}

function toCsv(rows: StoreRecord[]) {
  const header = ['门店编号', '门店名称', '所在城市', '门店类型', '营业状态', '开业日期', '店长', '更新时间'];
  const body = rows.map((row) => [
    row.code,
    row.name,
    `${row.region}/${row.city}`,
    typeLabel(row.type),
    statusLabel(row.status),
    row.openedAt,
    row.manager,
    row.updatedAt,
  ]);
  return [header, ...body]
    .map((line) => line.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');
}

function downloadCsv(rows: StoreRecord[]) {
  const blob = new Blob([`\uFEFF${toCsv(rows)}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'store-list.csv';
  link.click();
  URL.revokeObjectURL(url);
}
</script>
