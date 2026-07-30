import { useMemo, useState } from 'react';
import { FilterBar, Table } from '@sbux/starbucks-design-react';
import type { FilterFieldSchema, FilterValue } from '@sbux/starbucks-design-react';

const fields: FilterFieldSchema[] = [
  { type: 'input', name: 'keyword', label: '关键词', placeholder: '门店 / 编号', priority: 1 },
  {
    type: 'select',
    name: 'status',
    label: '状态',
    priority: 0,
    options: [
      { label: '营业中', value: 'open' },
      { label: '筹备中', value: 'pending' },
      { label: '已停用', value: 'closed' },
    ],
  },
  {
    type: 'multiSelect',
    name: 'channel',
    label: '渠道',
    priority: 2,
    maxTagCount: 1,
    options: [
      { label: '堂食', value: 'dine-in' },
      { label: '外送', value: 'delivery' },
      { label: '自提', value: 'pickup' },
    ],
  },
  { type: 'date', name: 'createdAt', label: '创建日期', priority: 3 },
  { type: 'dateRange', name: 'period', label: '营业周期', span: 2 },
];

const initialValues: FilterValue = {
  status: 'open',
  channel: ['dine-in'],
  period: ['2026-07-01', '2026-07-29'],
};

const basicColumns = { xs: 1, sm: 3, md: 3, lg: 3, xl: 3, xxl: 3 };

const rows = [
  { id: 'SH-001', name: '上海静安门店', status: 'open', channel: '堂食 / 外送' },
  { id: 'SH-018', name: '上海虹桥门店', status: 'pending', channel: '自提' },
  { id: 'HZ-011', name: '杭州西湖门店', status: 'open', channel: '堂食 / 自提' },
];
const tableColumns = [
  { title: '门店名称', dataIndex: 'name' },
  { title: '门店编号', dataIndex: 'id', width: 120 },
  { title: '渠道', dataIndex: 'channel', width: 160 },
];

export default function Demo() {
  const [draftValues, setDraftValues] = useState<FilterValue>(initialValues);
  const [activeValues, setActiveValues] = useState<FilterValue>(initialValues);
  const visibleRows = useMemo(() => {
    const keyword = String(activeValues.keyword ?? '').trim();
    const status = activeValues.status;
    return rows.filter((row) => {
      const keywordMatched = !keyword || row.name.includes(keyword) || row.id.includes(keyword);
      const statusMatched = !status || row.status === status;
      return keywordMatched && statusMatched;
    });
  }, [activeValues]);

  return (
    <div className="sb-filter-bar-demo sb-filter-bar-demo--basic">
      <FilterBar
        fields={fields}
        value={draftValues}
        activeValues={activeValues}
        defaultValue={initialValues}
        defaultVisibleCount={3}
        columns={basicColumns}
        onValuesChange={setDraftValues}
        onActiveValuesChange={setActiveValues}
      />
      <Table columns={tableColumns} data={visibleRows} pagination={false} rowKey="id" />
    </div>
  );
}
