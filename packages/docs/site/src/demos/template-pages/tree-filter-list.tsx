import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Button,
  Empty,
  FilterBar,
  Pagination,
  Radio,
  Result,
  Select,
  Space,
  Spin,
  Table,
  Tag,
  Tooltip,
  Tree,
} from '@sbux/starbucks-design-react';
import type { FilterFieldSchema, FilterValue, TableColumnProps } from '@sbux/starbucks-design-react';
import { PageHeader } from '@sbux/starbucks-design-react/pro';
import {
  IconDown,
  IconDownCircle,
  IconDoubleLeft,
  IconDoubleRight,
  IconDriveFile,
  IconMore,
  IconRefresh,
  IconRightCircle,
} from '@sbux/starbucks-design-react/icon';
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

const statusLabel: Record<StoreStatus, string> = {
  open: '营业中',
  preparing: '筹备中',
  closed: '已停业',
};

function statusTag(status: StoreStatus) {
  if (status === 'open') return <Tag color="green">营业中</Tag>;
  if (status === 'preparing') return <Tag color="arcoblue">筹备中</Tag>;
  return <Tag color="gray">已停业</Tag>;
}

function typeLabel(value: StoreRecord['storeType']) {
  return storeTypeOptions.find((option) => option.value === value)?.label ?? value;
}

function businessStatusLabel(value: StoreRecord['businessStatus']) {
  return businessStatusOptions.find((option) => option.value === value)?.label ?? value;
}

function channelLabel(value: StoreRecord['channel']) {
  return channelOptions.find((option) => option.value === value)?.label ?? value;
}

export default function Demo() {
  const [stores, setStores] = useState<StoreRecord[]>(initialStoreRows);
  const [draftFilterValues, setDraftFilterValues] = useState<FilterValue>(initialFilterValues);
  const [activeFilterValues, setActiveFilterValues] = useState<FilterValue>(initialFilterValues);
  const [treeDraft, setTreeDraft] = useState<Record<TreeType, TreeDraftState>>(cloneTreeStateByType);
  const [treeActive, setTreeActive] = useState<Record<TreeType, TreeDraftState>>(cloneTreeStateByType);
  const [activeTreeType, setActiveTreeType] = useState<TreeType>('operation');
  const [query, setQuery] = useState<TreeFilterListQuery>({
    treeType: 'operation',
    treeSelectedKeys: [],
    filterValues: initialFilterValues,
    page: 1,
    pageSize,
  });
  const [viewMode, setViewMode] = useState<ViewMode>('normal');
  const [requestLoading, setRequestLoading] = useState(false);
  const [filterVisibleCount, setFilterVisibleCount] = useState(3);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>(['store-001']);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const resettingRef = useRef(false);
  const filterModuleRef = useRef<HTMLElement>(null);
  const treeScrollRef = useRef<HTMLDivElement>(null);

  const isLoading = viewMode === 'loading' || requestLoading;
  const filteredRows = useMemo(() => {
    if (viewMode === 'empty') return [];
    return filterStoreRows(stores, query.treeType, query.treeSelectedKeys, query.filterValues);
  }, [query, stores, viewMode]);
  const pageData = useMemo(
    () => paginateRows(filteredRows, query.page, query.pageSize),
    [filteredRows, query.page, query.pageSize]
  );
  const currentTreeState = treeDraft[activeTreeType];
  const currentTreeData = treeDataByType[activeTreeType];
  const draftTreeSelectedKeys = getSelectedLeafKeys(
    currentTreeData,
    currentTreeState.checkedKeys,
    currentTreeState.halfCheckedKeys
  );
  const activeTreeSelectedKeys = treeActive[query.treeType].checkedKeys;
  const isTreeDraftDirty =
    activeTreeType !== query.treeType || !sameStringArray(draftTreeSelectedKeys, activeTreeSelectedKeys);
  const activeSelectedCount = treeActive[query.treeType].checkedKeys.length;

  useEffect(() => {
    setExpandedRowKeys((previous) => previous.filter((key) => getRowKeys(pageData).includes(key)));
  }, [pageData]);

  useEffect(() => {
    const filterBar = filterModuleRef.current?.querySelector<HTMLElement>('.sbux-filter-bar');
    if (!filterBar) return;

    const updateVisibleCount = () => {
      setFilterVisibleCount(getFilterDefaultVisibleCount(filterBar.clientWidth));
    };

    updateVisibleCount();
    const observer = new ResizeObserver(updateVisibleCount);
    observer.observe(filterBar);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (treeScrollRef.current) treeScrollRef.current.scrollTop = treeDraft[activeTreeType].scrollTop;
  }, [activeTreeType, treeDraft]);

  const updateQuery = (values: FilterValue) => {
    const nextTreeState = treeDraft[activeTreeType];
    const nextSelectedKeys = getSelectedLeafKeys(
      treeDataByType[activeTreeType],
      nextTreeState.checkedKeys,
      nextTreeState.halfCheckedKeys
    );
    const nextQuery: TreeFilterListQuery = {
      treeType: activeTreeType,
      treeSelectedKeys: nextSelectedKeys,
      filterValues: values,
      page: 1,
      pageSize,
    };

    setActiveFilterValues(values);
    setTreeActive((previous) => ({
      ...previous,
      [activeTreeType]: {
        ...nextTreeState,
        checkedKeys: nextSelectedKeys,
        halfCheckedKeys: [],
      },
    }));
    setQuery(nextQuery);
    setRequestLoading(true);
    window.setTimeout(() => setRequestLoading(false), 550);
  };

  const handleReset = () => {
    resettingRef.current = true;
    const nextTreeState = cloneTreeStateByType();
    setTreeDraft(nextTreeState);
    setTreeActive(cloneTreeStateByType());
    setStores(initialStoreRows);
    setActiveTreeType('operation');
    setDraftFilterValues(initialFilterValues);
    setActiveFilterValues(initialFilterValues);
    setQuery({
      treeType: 'operation',
      treeSelectedKeys: [],
      filterValues: initialFilterValues,
      page: 1,
      pageSize,
    });
    setExpandedRowKeys(['store-001']);
    setViewMode('normal');
    window.setTimeout(() => {
      resettingRef.current = false;
    }, 0);
  };

  const handleTreeCheck = (checkedKeys: string[], extra: { halfCheckedKeys?: string[] }) => {
    setTreeDraft((previous) => ({
      ...previous,
      [activeTreeType]: {
        ...previous[activeTreeType],
        checkedKeys: checkedKeys.map(String),
        halfCheckedKeys: (extra.halfCheckedKeys ?? []).map(String),
      },
    }));
  };

  const handleTreeExpand = (expandedKeys: string[]) => {
    setTreeDraft((previous) => ({
      ...previous,
      [activeTreeType]: {
        ...previous[activeTreeType],
        expandedKeys: expandedKeys.map(String),
      },
    }));
  };

  const handleTreeTypeChange = (nextType: string) => {
    if (nextType !== 'operation' && nextType !== 'geography') return;
    setActiveTreeType(nextType);
  };

  const refreshData = () => {
    setRequestLoading(true);
    window.setTimeout(() => setRequestLoading(false), 700);
  };

  const columns: TableColumnProps<StoreRecord>[] = [
    { title: 'Global ID', dataIndex: 'globalId', width: 130, fixed: 'left' },
    { title: '门店编号', dataIndex: 'storeNumber', width: 120, fixed: 'left' },
    { title: '门店名称', dataIndex: 'name', width: 230 },
    { title: '门店状态', dataIndex: 'storeStatus', width: 120, render: (_, record) => statusTag(record.storeStatus) },
    { title: '业务状态', dataIndex: 'businessStatus', width: 120, render: (_, record) => businessStatusLabel(record.businessStatus) },
    { title: '地理区域', dataIndex: 'geography', width: 140 },
    { title: '运营区域', dataIndex: 'operationRegion', width: 140 },
    { title: '门店类型', dataIndex: 'storeType', width: 120, render: (_, record) => typeLabel(record.storeType) },
    { title: '渠道', dataIndex: 'channel', width: 100, render: (_, record) => channelLabel(record.channel) },
    { title: '开业日期', dataIndex: 'openingDate', width: 130 },
    { title: '更新时间', dataIndex: 'updatedAt', width: 170 },
    {
      title: '操作',
      dataIndex: 'actions',
      width: 150,
      fixed: 'right',
      render: () => (
        <Space className="sb-tree-filter-list-page__row-actions" size={4}>
          <Button type="text" size="mini">查看</Button>
          <Button type="text" size="mini">编辑</Button>
          <Button type="text" size="mini" icon={<IconMore />} aria-label="更多操作" />
        </Space>
      ),
    },
  ];
  const pageHeader = (
    <PageHeader
      title="门店列表"
      helpText="通过区域树和筛选条件定位门店"
      extra={(
        <div className="sb-tree-filter-list-page__breadcrumb-actions">
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
        </div>
      )}
    />
  );
  const pageHeaderHost =
    typeof document === 'undefined'
      ? null
      : document.querySelector<HTMLElement>('[data-template-page-header-host="tree-filter-list"]');

  return (
    <>
      {pageHeaderHost && createPortal(pageHeader, pageHeaderHost)}
    <div className="sb-tree-filter-list-page sb-template-page-surface">
      {!pageHeaderHost && pageHeader}
      <div className={`sb-tree-filter-list-page__layout${sidebarCollapsed ? ' is-sidebar-collapsed' : ''}`}>
        <aside className="sb-tree-filter-list-page__sidebar">
          <div className="sb-tree-filter-list-page__sidebar-header">
            {!sidebarCollapsed && <h2>区域筛选</h2>}
            <Tooltip content={sidebarCollapsed ? '展开区域筛选' : '折叠区域筛选'}>
              <Button
                type="text"
                shape="square"
                aria-label={sidebarCollapsed ? '展开区域筛选' : '折叠区域筛选'}
                icon={sidebarCollapsed ? <IconDoubleRight /> : <IconDoubleLeft />}
                onClick={() => setSidebarCollapsed((previous) => !previous)}
              />
            </Tooltip>
          </div>

          {sidebarCollapsed ? (
            <div className="sb-tree-filter-list-page__sidebar-summary">
              <strong>{treeTypeLabels[query.treeType]}</strong>
              <span>已选择 {activeSelectedCount} 个区域</span>
              {isTreeDraftDirty && <Tag color="arcoblue">待查询</Tag>}
            </div>
          ) : (
            <>
              <div className="sb-tree-filter-list-page__tree-type">
                <Radio.Group type="button" value={activeTreeType} onChange={handleTreeTypeChange}>
                  <Radio value="operation">运营区域</Radio>
                  <Radio value="geography">地理区域</Radio>
                </Radio.Group>
              </div>
              <div
                ref={treeScrollRef}
                className="sb-tree-filter-list-page__tree-scroll"
                onScroll={(event) => {
                  const scrollTop = event.currentTarget.scrollTop;
                  setTreeDraft((previous) => ({
                    ...previous,
                    [activeTreeType]: { ...previous[activeTreeType], scrollTop },
                  }));
                }}
              >
                {viewMode === 'error' ? (
                  <Result
                    status="error"
                    title="区域数据加载失败"
                    subTitle="当前为本地错误状态演示。"
                    extra={<Button type="primary" onClick={() => setViewMode('normal')}>重试</Button>}
                  />
                ) : viewMode === 'empty' ? (
                  <Empty description="暂无区域数据" />
                ) : (
                  <Spin loading={isLoading} block>
                    <Tree
                      checkable
                      checkStrictly={false}
                      showLine
                      icons={(node) => ({
                        switcherIcon: node.isLeaf ? <IconDriveFile /> : <IconDown />,
                      })}
                      treeData={currentTreeData}
                      checkedKeys={currentTreeState.checkedKeys}
                      expandedKeys={currentTreeState.expandedKeys}
                      onCheck={handleTreeCheck}
                      onExpand={handleTreeExpand}
                    />
                  </Spin>
                )}
              </div>
            </>
          )}
        </aside>

        <main className="sb-tree-filter-list-page__content">
          <section
            ref={filterModuleRef}
            className="sb-tree-filter-list-page__module sb-tree-filter-list-page__filter-module"
          >
            <FilterBar
              fields={fields}
              value={draftFilterValues}
              activeValues={activeFilterValues}
              defaultValue={initialFilterValues}
              columns={filterColumns}
              defaultVisibleCount={filterVisibleCount}
              submitMode="manual"
              loading={isLoading}
              onValuesChange={setDraftFilterValues}
              onActiveValuesChange={(values) => {
                if (!resettingRef.current) updateQuery(values);
              }}
              onReset={handleReset}
            />
          </section>

          <section className="sb-tree-filter-list-page__module sb-tree-filter-list-page__table-module">
            <div className="sb-tree-filter-list-page__toolbar">
              <div className="sb-tree-filter-list-page__toolbar-left">
                <h2 className="sb-tree-filter-list-page__list-title">门店列表</h2>
              </div>
              <div className="sb-tree-filter-list-page__toolbar-right">
                <Tooltip content="刷新">
                  <Button
                    type="outline"
                    shape="square"
                    aria-label="刷新"
                    loading={requestLoading}
                    icon={<IconRefresh />}
                    onClick={refreshData}
                  />
                </Tooltip>
              </div>
            </div>

            {viewMode === 'error' ? (
              <Result
                status="error"
                title="门店数据加载失败"
                subTitle="当前为本地错误状态演示。"
                extra={<Button type="primary" onClick={() => setViewMode('normal')}>返回正常状态</Button>}
              />
            ) : (
              <div className="sb-tree-filter-list-page__table-scroll">
                <Table
                  rowKey="id"
                  columns={columns}
                  data={pageData}
                  loading={isLoading}
                  pagination={false}
                  scroll={{ x: 1540 }}
                  expandProps={{
                    icon: ({ expanded }) =>
                      expanded ? <IconDownCircle /> : <IconRightCircle />,
                  }}
                  expandedRowKeys={expandedRowKeys}
                  onExpandedRowsChange={(keys) => setExpandedRowKeys(keys as string[])}
                  noDataElement={<Empty description="暂无符合条件的门店数据" />}
                />
              </div>
            )}

            <div className="sb-tree-filter-list-page__pagination">
              <Pagination
                total={filteredRows.length}
                pageSize={pageSize}
                current={query.page}
                showTotal
                showJumper
                onChange={(page) => {
                  setQuery((previous) => ({ ...previous, page }));
                }}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
    </>
  );
}
