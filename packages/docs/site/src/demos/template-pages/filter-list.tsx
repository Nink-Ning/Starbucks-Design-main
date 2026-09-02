import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Button,
  Checkbox,
  Dropdown,
  Empty,
  FilterBar,
  Input,
  Menu,
  Modal,
  Pagination,
  Result,
  Select,
  Space,
  Table,
  TableToolbar,
  Tag,
} from '@sbux/starbucks-design-react';
import type {
  FilterFieldSchema,
  FilterValue,
  TableColumnProps,
  TableToolbarAction,
} from '@sbux/starbucks-design-react';
import { PageHeader } from '@sbux/starbucks-design-react/pro';
import {
  IconCheckCircle,
  IconCloseCircle,
  IconMore,
  IconMinusCircle,
  IconPlus,
} from '@sbux/starbucks-design-react/icon';

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

const fields: FilterFieldSchema[] = [
  {
    type: 'input',
    name: 'keyword',
    label: '关键词',
    placeholder: '搜索门店名称或门店编号',
    allowClear: true,
    priority: 0,
  },
  {
    type: 'select',
    name: 'status',
    label: '营业状态',
    placeholder: '请选择营业状态',
    allowClear: true,
    options: statusOptions,
    priority: 1,
  },
  {
    type: 'cascader',
    name: 'city',
    label: '所在城市',
    placeholder: '请选择城市',
    allowClear: true,
    options: cityOptions,
    priority: 2,
  },
  {
    type: 'multiSelect',
    name: 'storeType',
    label: '门店类型',
    placeholder: '请选择门店类型',
    allowClear: true,
    maxTagCount: 1,
    options: typeOptions,
    priority: 3,
  },
  {
    type: 'dateRange',
    name: 'openingDate',
    label: '开业日期',
    placeholder: ['开始日期', '结束日期'],
    allowClear: true,
    priority: 4,
  },
];

const initialFilterValues: FilterValue = {};
const filterColumns = { xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3 };
const pageSize = 10;
const operationActions: TableToolbarAction[] = [
  { key: 'open', label: '启用', icon: <IconCheckCircle />, requiresSelection: true },
  { key: 'closed', label: '停用', icon: <IconMinusCircle />, requiresSelection: true },
];
const moreActions: TableToolbarAction[] = [
  { key: 'clear', label: '清除选择', icon: <IconCloseCircle />, requiresSelection: true },
];
const columnModalTitle = <span className="sb-filter-list-page__modal-title">列设置</span>;
const createModalTitle = <span className="sb-filter-list-page__modal-title">新建门店</span>;

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

const cityByValue = new Map(
  cityOptions.flatMap((group) =>
    (group.children ?? []).map((city) => [city.value, { city: city.label, region: group.label }])
  )
);

function statusLabel(status: StoreStatus) {
  return statusOptions.find((option) => option.value === status)?.label ?? status;
}

function typeLabel(type: StoreType) {
  return typeOptions.find((option) => option.value === type)?.label ?? type;
}

function statusTag(status: StoreStatus) {
  if (status === 'open') return <Tag color="green">营业中</Tag>;
  if (status === 'preparing') return <Tag color="arcoblue">筹备中</Tag>;
  return <Tag color="gray">已停业</Tag>;
}

function normalizeArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

function filterStores(stores: StoreRecord[], activeValues: FilterValue) {
  const keyword = String(activeValues.keyword ?? '').trim().toLowerCase();
  const status = activeValues.status as StoreStatus | undefined;
  const cityPath = normalizeArray(activeValues.city);
  const city = cityPath[cityPath.length - 1];
  const types = normalizeArray(activeValues.storeType);
  const openingDate = normalizeArray(activeValues.openingDate);
  const [startDate, endDate] = openingDate;

  return stores.filter((store) => {
    const keywordMatched =
      !keyword ||
      store.name.toLowerCase().includes(keyword) ||
      store.code.toLowerCase().includes(keyword);
    const statusMatched = !status || store.status === status;
    const cityMatched = !city || store.cityValue === city;
    const typeMatched = types.length === 0 || types.includes(store.type);
    const startMatched = !startDate || store.openedAt >= startDate;
    const endMatched = !endDate || store.openedAt <= endDate;
    return keywordMatched && statusMatched && cityMatched && typeMatched && startMatched && endMatched;
  });
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
  if (typeof document === 'undefined') return;
  const blob = new Blob([`\uFEFF${toCsv(rows)}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'store-list.csv';
  link.click();
  URL.revokeObjectURL(url);
}

export default function Demo() {
  const [stores, setStores] = useState<StoreRecord[]>(initialStores);
  const [draftValues, setDraftValues] = useState<FilterValue>(initialFilterValues);
  const [activeValues, setActiveValues] = useState<FilterValue>(initialFilterValues);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [current, setCurrent] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>('normal');
  const [refreshing, setRefreshing] = useState(false);
  const [columnModalVisible, setColumnModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [visibleColumnKeys, setVisibleColumnKeys] = useState<ColumnKey[]>(columnOptions.map((option) => option.key));
  const [newStore, setNewStore] = useState<NewStoreForm>({
    code: '',
    name: '',
    cityValue: 'shanghai',
    status: 'preparing',
  });

  const isLoading = viewMode === 'loading' || refreshing;
  const filteredStores = useMemo(() => {
    if (viewMode === 'empty') return [];
    return filterStores(stores, activeValues);
  }, [activeValues, stores, viewMode]);
  const total = filteredStores.length;
  const pageData = filteredStores.slice((current - 1) * pageSize, current * pageSize);

  useEffect(() => {
    setCurrent(1);
    setSelectedRowKeys([]);
  }, [activeValues, viewMode]);

  const setActiveSnapshot = (values: FilterValue) => {
    setActiveValues(values);
  };

  const changeStatusForSelected = (status: StoreStatus) => {
    if (selectedRowKeys.length === 0) return;
    setStores((previous) =>
      previous.map((store) =>
        selectedRowKeys.includes(store.id)
          ? { ...store, status, updatedAt: '2026-07-29 09:30' }
          : store
      )
    );
    setSelectedRowKeys([]);
  };

  const openBatchConfirm = (status: BatchStatus) => {
    if (selectedRowKeys.length === 0) return;
    const action = status === 'open' ? '启用' : '停用';
    Modal.warning({
      title: `确认批量${action}`,
      content: `确认${action}选中的 ${selectedRowKeys.length} 家门店？确认后将立即更新本地 Mock 数据中的营业状态。`,
      okText: '确定',
      onOk: () => changeStatusForSelected(status),
    });
  };

  const handleToolbarOperation = (key: string) => {
    if (key === 'open' || key === 'closed') {
      openBatchConfirm(key);
      return;
    }
    if (key === 'clear') setSelectedRowKeys([]);
  };

  const refreshData = () => {
    setRefreshing(true);
    window.setTimeout(() => {
      setRefreshing(false);
    }, 700);
  };

  const createStore = () => {
    const cityMeta = cityByValue.get(newStore.cityValue) ?? { city: '上海', region: '华东' };
    const nextStore: StoreRecord = {
      id: `${Date.now()}`,
      code: newStore.code || `NEW-${stores.length + 1}`,
      name: newStore.name || '新门店',
      region: cityMeta.region,
      city: cityMeta.city,
      cityValue: newStore.cityValue,
      type: 'standard',
      status: newStore.status,
      openedAt: '2026-07-29',
      manager: '待分配',
      updatedAt: '2026-07-29 10:00',
    };
    setStores((previous) => [nextStore, ...previous]);
    setCreateModalVisible(false);
    setCurrent(1);
    setNewStore({ code: '', name: '', cityValue: 'shanghai', status: 'preparing' });
  };

  const allColumns: TableColumnProps<StoreRecord>[] = [
    { title: '门店编号', dataIndex: 'code', width: 120, fixed: 'left' },
    { title: '门店名称', dataIndex: 'name', width: 220, fixed: 'left' },
    {
      title: '所在城市',
      dataIndex: 'city',
      width: 140,
      render: (_, record) => `${record.region} / ${record.city}`,
    },
    {
      title: '门店类型',
      dataIndex: 'type',
      width: 120,
      render: (_, record) => typeLabel(record.type),
    },
    {
      title: '营业状态',
      dataIndex: 'status',
      width: 120,
      render: (_, record) => statusTag(record.status),
    },
    { title: '开业日期', dataIndex: 'openedAt', width: 140 },
    { title: '店长', dataIndex: 'manager', width: 120 },
    { title: '更新时间', dataIndex: 'updatedAt', width: 180 },
    {
      title: '操作',
      width: 180,
      fixed: 'right',
      render: () => (
        <Space className="sb-filter-list-page__row-actions" size={4}>
          <Button type="text" size="mini">查看</Button>
          <Button type="text" size="mini">编辑</Button>
          <Dropdown
            droplist={
              <Menu>
                <Menu.Item key="copy">复制门店</Menu.Item>
                <Menu.Item key="archive">停用门店</Menu.Item>
              </Menu>
            }
          >
            <Button type="text" size="mini" icon={<IconMore />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const columns = allColumns.filter((column, index) => visibleColumnKeys.includes(columnOptions[index].key));
  const pageHeader = (
    <PageHeader
      title="门店列表"
      helpText="支持通过多条件筛选定位门店"
      extra={(
        <div className="sb-filter-list-page__breadcrumb-actions">
          <Select
            aria-label="页面状态"
            style={{ width: 120 }}
            value={viewMode}
            options={[
              { label: 'Normal', value: 'normal' },
              { label: 'Loading', value: 'loading' },
              { label: 'Empty', value: 'empty' },
              { label: 'Error', value: 'error' },
            ]}
            onChange={(value) => setViewMode(value as ViewMode)}
          />
          <Button type="primary" icon={<IconPlus />} onClick={() => setCreateModalVisible(true)}>
            新建门店
          </Button>
        </div>
      )}
    />
  );
  const pageHeaderHost =
    typeof document === 'undefined'
      ? null
      : document.querySelector<HTMLElement>('[data-template-page-header-host="filter-list"]');

  return (
    <>
      {pageHeaderHost && createPortal(pageHeader, pageHeaderHost)}
    <div className="sb-filter-list-page sb-template-page-surface">
      {!pageHeaderHost && pageHeader}
      <section className="sb-filter-list-page__module">
        <FilterBar
          fields={fields}
          value={draftValues}
          activeValues={activeValues}
          defaultValue={initialFilterValues}
          columns={filterColumns}
          defaultVisibleCount={3}
          submitMode="manual"
          loading={isLoading}
          onValuesChange={setDraftValues}
          onActiveValuesChange={setActiveSnapshot}
        />
      </section>

      <section className="sb-filter-list-page__module sb-filter-list-page__table-module">
        <TableToolbar
          selectedCount={selectedRowKeys.length}
          operationActions={operationActions}
          moreActions={moreActions}
          tableTools={{
            export: true,
            columnSettings: true,
            refresh: { loading: refreshing },
          }}
          onOperation={handleToolbarOperation}
          onExport={() => downloadCsv(filteredStores)}
          onColumnSettings={() => setColumnModalVisible(true)}
          onRefresh={refreshData}
        />

        {viewMode === 'error' ? (
          <Result
            status="error"
            title="门店数据加载失败"
            subTitle="当前为本地错误状态演示，可切换页面状态或刷新恢复。"
            extra={[
              <Button key="normal" type="primary" onClick={() => setViewMode('normal')}>
                返回正常状态
              </Button>,
            ]}
          />
        ) : (
          <>
            <Table
              rowKey="id"
              columns={columns}
              data={pageData}
              loading={isLoading}
              pagination={false}
              scroll={{ x: 1160 }}
              noDataElement={<Empty description="暂无符合条件的门店" />}
              rowSelection={{
                type: 'checkbox',
                selectedRowKeys,
                onChange: (keys) => setSelectedRowKeys(keys as string[]),
              }}
            />
            <div className="sb-filter-list-page__pagination">
              <Pagination
                total={total}
                pageSize={pageSize}
                current={current}
                showTotal
                showJumper
                onChange={(page) => setCurrent(page)}
              />
            </div>
          </>
        )}
      </section>

      <Modal
        title={columnModalTitle}
        visible={columnModalVisible}
        onOk={() => setColumnModalVisible(false)}
        onCancel={() => setColumnModalVisible(false)}
        autoFocus={false}
        focusLock
      >
        <Checkbox.Group value={visibleColumnKeys} onChange={(values) => setVisibleColumnKeys(values as ColumnKey[])}>
          <Space direction="vertical" size={12}>
            {columnOptions.map((column) => (
              <Checkbox key={column.key} value={column.key} disabled={column.fixed}>
                {column.label}
              </Checkbox>
            ))}
          </Space>
        </Checkbox.Group>
      </Modal>

      <Modal
        title={createModalTitle}
        visible={createModalVisible}
        onOk={createStore}
        onCancel={() => setCreateModalVisible(false)}
        autoFocus={false}
        focusLock
      >
        <div className="sb-filter-list-page__modal-form">
          <label>
            <span>门店名称</span>
            <Input value={newStore.name} placeholder="请输入门店名称" onChange={(value) => setNewStore((store) => ({ ...store, name: value }))} />
          </label>
          <label>
            <span>门店编号</span>
            <Input value={newStore.code} placeholder="请输入门店编号" onChange={(value) => setNewStore((store) => ({ ...store, code: value }))} />
          </label>
          <label>
            <span>所在城市</span>
            <Select value={newStore.cityValue} onChange={(value) => setNewStore((store) => ({ ...store, cityValue: String(value) }))}>
              <Select.Option value="shanghai">上海</Select.Option>
              <Select.Option value="hangzhou">杭州</Select.Option>
              <Select.Option value="shenzhen">深圳</Select.Option>
              <Select.Option value="beijing">北京</Select.Option>
            </Select>
          </label>
          <label>
            <span>营业状态</span>
            <Select value={newStore.status} onChange={(value) => setNewStore((store) => ({ ...store, status: value as StoreStatus }))}>
              <Select.Option value="open">营业中</Select.Option>
              <Select.Option value="preparing">筹备中</Select.Option>
              <Select.Option value="closed">已停业</Select.Option>
            </Select>
          </label>
        </div>
      </Modal>
    </div>
    </>
  );
}
