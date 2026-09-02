export type TreeType = 'operation' | 'geography';

export type StoreStatus = 'open' | 'preparing' | 'closed';
export type BusinessStatus = 'in-service' | 'planned' | 'retired';
export type StoreType = 'standard' | 'reserve' | 'delivery';
export type Channel = 'direct' | 'licensed' | 'delivery';

export type FilterValues = Record<string, unknown>;

export type TreeNode = {
  title: string;
  key: string;
  children?: TreeNode[];
  disabled?: boolean;
  disableCheckbox?: boolean;
};

export type StoreRecord = {
  id: string;
  globalId: string;
  storeNumber: string;
  name: string;
  storeStatus: StoreStatus;
  businessStatus: BusinessStatus;
  storeType: StoreType;
  channel: Channel;
  openingDate: string;
  operationRegionKey: string;
  geographyRegionKey: string;
  operationRegion: string;
  geography: string;
  updatedAt: string;
  children?: StoreRecord[];
};

export type TreeDraftState = {
  checkedKeys: string[];
  halfCheckedKeys: string[];
  expandedKeys: string[];
  scrollTop: number;
};

export type TreeFilterListQuery = {
  treeType: TreeType;
  treeSelectedKeys: string[];
  filterValues: FilterValues;
  page: number;
  pageSize: number;
};

export const treeTypeLabels: Record<TreeType, string> = {
  operation: '运营区域',
  geography: '地理区域',
};

export const getFilterDefaultVisibleCount = (containerWidth: number) => {
  if (containerWidth < 576) return 1;
  if (containerWidth < 768) return 2;
  return 3;
};

export const statusOptions = [
  { label: '营业中', value: 'open' },
  { label: '筹备中', value: 'preparing' },
  { label: '已停业', value: 'closed' },
];

export const businessStatusOptions = [
  { label: '在营', value: 'in-service' },
  { label: '筹备', value: 'planned' },
  { label: '已归档', value: 'retired' },
];

export const storeTypeOptions = [
  { label: '标准店', value: 'standard' },
  { label: '臻选店', value: 'reserve' },
  { label: '外送店', value: 'delivery' },
];

export const channelOptions = [
  { label: '直营', value: 'direct' },
  { label: '授权', value: 'licensed' },
  { label: '外送', value: 'delivery' },
];

const operationTree: TreeNode[] = [
  {
    title: '全国运营区域',
    key: 'operation-root',
    children: [
      {
        title: '华东运营区',
        key: 'operation-east',
        children: [
          { title: '上海', key: 'operation-east-shanghai' },
          { title: '杭州', key: 'operation-east-hangzhou' },
          { title: '苏州', key: 'operation-east-suzhou' },
        ],
      },
      {
        title: '华南运营区',
        key: 'operation-south',
        children: [
          { title: '深圳', key: 'operation-south-shenzhen' },
          { title: '广州', key: 'operation-south-guangzhou' },
        ],
      },
      {
        title: '华北运营区',
        key: 'operation-north',
        children: [
          { title: '北京', key: 'operation-north-beijing' },
          { title: '天津', key: 'operation-north-tianjin' },
        ],
      },
    ],
  },
];

const geographyTree: TreeNode[] = [
  {
    title: '中国',
    key: 'geography-root',
    children: [
      {
        title: '华东地区',
        key: 'geography-east',
        children: [
          { title: '上海市', key: 'geography-shanghai' },
          { title: '浙江省', key: 'geography-zhejiang' },
          { title: '江苏省', key: 'geography-jiangsu' },
        ],
      },
      {
        title: '华南地区',
        key: 'geography-south',
        children: [
          { title: '广东省', key: 'geography-guangdong' },
          { title: '广西壮族自治区', key: 'geography-guangxi' },
        ],
      },
      {
        title: '华北地区',
        key: 'geography-north',
        children: [
          { title: '北京市', key: 'geography-beijing' },
          { title: '天津市', key: 'geography-tianjin' },
        ],
      },
    ],
  },
];

export const treeDataByType: Record<TreeType, TreeNode[]> = {
  operation: operationTree,
  geography: geographyTree,
};

export const initialTreeStateByType: Record<TreeType, TreeDraftState> = {
  operation: {
    checkedKeys: [],
    halfCheckedKeys: [],
    expandedKeys: ['operation-root', 'operation-east', 'operation-south', 'operation-north'],
    scrollTop: 0,
  },
  geography: {
    checkedKeys: [],
    halfCheckedKeys: [],
    expandedKeys: ['geography-root', 'geography-east', 'geography-south', 'geography-north'],
    scrollTop: 0,
  },
};

const child = (record: StoreRecord, suffix: string, name: string): StoreRecord => ({
  ...record,
  id: `${record.id}-${suffix}`,
  globalId: `${record.globalId}-${suffix}`,
  storeNumber: `${record.storeNumber}-${suffix}`,
  name,
  children: undefined,
});

export const initialStoreRows: StoreRecord[] = [
  {
    id: 'store-001',
    globalId: 'G-23882',
    storeNumber: 'SH-001',
    name: '上海静安嘉里中心店',
    storeStatus: 'open',
    businessStatus: 'in-service',
    storeType: 'reserve',
    channel: 'direct',
    openingDate: '2020-05-18',
    operationRegionKey: 'operation-east-shanghai',
    geographyRegionKey: 'geography-shanghai',
    operationRegion: '华东运营区',
    geography: '上海市',
    updatedAt: '2026-07-24 10:30',
    children: [
      child(
        {
          id: 'store-001',
          globalId: 'G-23882',
          storeNumber: 'SH-001',
          name: '上海静安嘉里中心店',
          storeStatus: 'open',
          businessStatus: 'in-service',
          storeType: 'reserve',
          channel: 'direct',
          openingDate: '2020-05-18',
          operationRegionKey: 'operation-east-shanghai',
          geographyRegionKey: 'geography-shanghai',
          operationRegion: '华东运营区',
          geography: '上海市',
          updatedAt: '2026-07-24 10:30',
        },
        '01',
        '上海静安嘉里中心店 · 后场仓',
      ),
    ],
  },
  {
    id: 'store-002',
    globalId: 'G-23891',
    storeNumber: 'SH-018',
    name: '上海虹桥天地店',
    storeStatus: 'open',
    businessStatus: 'in-service',
    storeType: 'standard',
    channel: 'licensed',
    openingDate: '2021-09-12',
    operationRegionKey: 'operation-east-shanghai',
    geographyRegionKey: 'geography-shanghai',
    operationRegion: '华东运营区',
    geography: '上海市',
    updatedAt: '2026-07-23 15:20',
  },
  {
    id: 'store-003',
    globalId: 'G-23912',
    storeNumber: 'HZ-011',
    name: '杭州西湖银泰店',
    storeStatus: 'preparing',
    businessStatus: 'planned',
    storeType: 'standard',
    channel: 'direct',
    openingDate: '2026-08-10',
    operationRegionKey: 'operation-east-hangzhou',
    geographyRegionKey: 'geography-zhejiang',
    operationRegion: '华东运营区',
    geography: '浙江省',
    updatedAt: '2026-07-22 09:15',
    children: [
      child(
        {
          id: 'store-003',
          globalId: 'G-23912',
          storeNumber: 'HZ-011',
          name: '杭州西湖银泰店',
          storeStatus: 'preparing',
          businessStatus: 'planned',
          storeType: 'standard',
          channel: 'direct',
          openingDate: '2026-08-10',
          operationRegionKey: 'operation-east-hangzhou',
          geographyRegionKey: 'geography-zhejiang',
          operationRegion: '华东运营区',
          geography: '浙江省',
          updatedAt: '2026-07-22 09:15',
        },
        '01',
        '杭州西湖银泰店 · 筹备档案',
      ),
    ],
  },
  {
    id: 'store-004',
    globalId: 'G-23935',
    storeNumber: 'SZ-006',
    name: '深圳湾万象城店',
    storeStatus: 'open',
    businessStatus: 'in-service',
    storeType: 'delivery',
    channel: 'delivery',
    openingDate: '2022-03-08',
    operationRegionKey: 'operation-south-shenzhen',
    geographyRegionKey: 'geography-guangdong',
    operationRegion: '华南运营区',
    geography: '广东省',
    updatedAt: '2026-07-21 18:00',
  },
  {
    id: 'store-005',
    globalId: 'G-23941',
    storeNumber: 'BJ-009',
    name: '北京国贸商城店',
    storeStatus: 'open',
    businessStatus: 'in-service',
    storeType: 'reserve',
    channel: 'direct',
    openingDate: '2019-11-01',
    operationRegionKey: 'operation-north-beijing',
    geographyRegionKey: 'geography-beijing',
    operationRegion: '华北运营区',
    geography: '北京市',
    updatedAt: '2026-07-21 13:48',
  },
  {
    id: 'store-006',
    globalId: 'G-23960',
    storeNumber: 'GZ-013',
    name: '广州天河城店',
    storeStatus: 'closed',
    businessStatus: 'retired',
    storeType: 'standard',
    channel: 'licensed',
    openingDate: '2018-06-21',
    operationRegionKey: 'operation-south-guangzhou',
    geographyRegionKey: 'geography-guangdong',
    operationRegion: '华南运营区',
    geography: '广东省',
    updatedAt: '2026-07-20 16:12',
    children: [
      child(
        {
          id: 'store-006',
          globalId: 'G-23960',
          storeNumber: 'GZ-013',
          name: '广州天河城店',
          storeStatus: 'closed',
          businessStatus: 'retired',
          storeType: 'standard',
          channel: 'licensed',
          openingDate: '2018-06-21',
          operationRegionKey: 'operation-south-guangzhou',
          geographyRegionKey: 'geography-guangdong',
          operationRegion: '华南运营区',
          geography: '广东省',
          updatedAt: '2026-07-20 16:12',
        },
        '01',
        '广州天河城店 · 历史记录',
      ),
    ],
  },
  {
    id: 'store-007',
    globalId: 'G-23982',
    storeNumber: 'SU-002',
    name: '苏州中心臻选店',
    storeStatus: 'open',
    businessStatus: 'in-service',
    storeType: 'reserve',
    channel: 'direct',
    openingDate: '2023-04-15',
    operationRegionKey: 'operation-east-suzhou',
    geographyRegionKey: 'geography-jiangsu',
    operationRegion: '华东运营区',
    geography: '江苏省',
    updatedAt: '2026-07-20 11:06',
  },
  {
    id: 'store-008',
    globalId: 'G-24004',
    storeNumber: 'TJ-004',
    name: '天津恒隆广场店',
    storeStatus: 'preparing',
    businessStatus: 'planned',
    storeType: 'standard',
    channel: 'direct',
    openingDate: '2026-09-01',
    operationRegionKey: 'operation-north-tianjin',
    geographyRegionKey: 'geography-tianjin',
    operationRegion: '华北运营区',
    geography: '天津市',
    updatedAt: '2026-07-19 19:35',
  },
  {
    id: 'store-009',
    globalId: 'G-24018',
    storeNumber: 'SH-027',
    name: '上海前滩太古里店',
    storeStatus: 'open',
    businessStatus: 'in-service',
    storeType: 'delivery',
    channel: 'delivery',
    openingDate: '2024-12-06',
    operationRegionKey: 'operation-east-shanghai',
    geographyRegionKey: 'geography-shanghai',
    operationRegion: '华东运营区',
    geography: '上海市',
    updatedAt: '2026-07-18 14:26',
  },
  {
    id: 'store-010',
    globalId: 'G-24032',
    storeNumber: 'HZ-020',
    name: '杭州滨江龙湖店',
    storeStatus: 'closed',
    businessStatus: 'retired',
    storeType: 'delivery',
    channel: 'delivery',
    openingDate: '2020-10-23',
    operationRegionKey: 'operation-east-hangzhou',
    geographyRegionKey: 'geography-zhejiang',
    operationRegion: '华东运营区',
    geography: '浙江省',
    updatedAt: '2026-07-17 10:52',
  },
  {
    id: 'store-011',
    globalId: 'G-24057',
    storeNumber: 'BJ-021',
    name: '北京望京凯德店',
    storeStatus: 'open',
    businessStatus: 'in-service',
    storeType: 'standard',
    channel: 'licensed',
    openingDate: '2021-12-19',
    operationRegionKey: 'operation-north-beijing',
    geographyRegionKey: 'geography-beijing',
    operationRegion: '华北运营区',
    geography: '北京市',
    updatedAt: '2026-07-16 17:44',
  },
  {
    id: 'store-012',
    globalId: 'G-24071',
    storeNumber: 'SZ-015',
    name: '深圳南山科技园店',
    storeStatus: 'open',
    businessStatus: 'in-service',
    storeType: 'delivery',
    channel: 'delivery',
    openingDate: '2022-08-28',
    operationRegionKey: 'operation-south-shenzhen',
    geographyRegionKey: 'geography-guangdong',
    operationRegion: '华南运营区',
    geography: '广东省',
    updatedAt: '2026-07-15 12:38',
  },
];

export function cloneTreeStateByType(): Record<TreeType, TreeDraftState> {
  return {
    operation: { ...initialTreeStateByType.operation, checkedKeys: [], halfCheckedKeys: [], expandedKeys: [...initialTreeStateByType.operation.expandedKeys] },
    geography: { ...initialTreeStateByType.geography, checkedKeys: [], halfCheckedKeys: [], expandedKeys: [...initialTreeStateByType.geography.expandedKeys] },
  };
}

export function normalizeArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

function getLeafKeysFromNode(node: TreeNode, checked: Set<string>, halfChecked: Set<string>): string[] {
  if (!node.children?.length) return checked.has(node.key) ? [node.key] : [];
  if (checked.has(node.key) && !halfChecked.has(node.key)) return getAllLeafKeys([node]);
  return node.children.flatMap((child) => getLeafKeysFromNode(child, checked, halfChecked));
}

export function getAllLeafKeys(nodes: TreeNode[]): string[] {
  return nodes.flatMap((node) => (node.children?.length ? getAllLeafKeys(node.children) : [node.key]));
}

export function getSelectedLeafKeys(
  nodes: TreeNode[],
  checkedKeys: string[],
  halfCheckedKeys: string[] = [],
): string[] {
  const checked = new Set(checkedKeys.map(String));
  const halfChecked = new Set(halfCheckedKeys.map(String));
  return Array.from(new Set(nodes.flatMap((node) => getLeafKeysFromNode(node, checked, halfChecked))));
}

function getString(value: unknown): string {
  return String(value ?? '').trim().toLowerCase();
}

function matchesRecord(record: StoreRecord, filters: FilterValues, selectedKeys: Set<string>, treeType: TreeType): boolean {
  const keyword = getString(filters.keyword);
  const status = String(filters.status ?? '');
  const businessStatus = String(filters.businessStatus ?? '');
  const storeTypes = normalizeArray(filters.storeType);
  const channel = String(filters.channel ?? '');
  const openingDate = normalizeArray(filters.openingDate);
  const [startDate, endDate] = openingDate;
  const treeKey = treeType === 'operation' ? record.operationRegionKey : record.geographyRegionKey;

  return (
    (!keyword || `${record.globalId} ${record.storeNumber} ${record.name}`.toLowerCase().includes(keyword)) &&
    (!status || record.storeStatus === status) &&
    (!businessStatus || record.businessStatus === businessStatus) &&
    (storeTypes.length === 0 || storeTypes.includes(record.storeType)) &&
    (!channel || record.channel === channel) &&
    (!startDate || record.openingDate >= startDate) &&
    (!endDate || record.openingDate <= endDate) &&
    (selectedKeys.size === 0 || selectedKeys.has(treeKey))
  );
}

export function filterStoreRows(
  rows: StoreRecord[],
  treeType: TreeType,
  selectedKeys: string[],
  filters: FilterValues,
): StoreRecord[] {
  const selected = new Set(selectedKeys);
  return rows.flatMap((row) => {
    const rowMatches = matchesRecord(row, filters, selected, treeType);
    const children = row.children
      ?.map((childRow) => (matchesRecord(childRow, filters, selected, treeType) ? childRow : null))
      .filter((childRow): childRow is StoreRecord => Boolean(childRow));
    if (rowMatches) return [{ ...row, children: row.children }];
    return children?.length ? [{ ...row, children }] : [];
  });
}

export function paginateRows(rows: StoreRecord[], page: number, pageSize: number): StoreRecord[] {
  return rows.slice((page - 1) * pageSize, page * pageSize);
}

export function getRowKeys(rows: StoreRecord[]): string[] {
  return rows.flatMap((row) => [row.id, ...(row.children ? getRowKeys(row.children) : [])]);
}

export function sameStringArray(first: string[], second: string[]): boolean {
  if (first.length !== second.length) return false;
  const secondSet = new Set(second);
  return first.every((value) => secondSet.has(value));
}
