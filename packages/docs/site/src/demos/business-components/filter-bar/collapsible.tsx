import { useState } from 'react';
import { FilterBar } from '@sbux/starbucks-design-react';
import type { FilterFieldSchema, FilterValue } from '@sbux/starbucks-design-react';

const fields: FilterFieldSchema[] = [
  { type: 'input', name: 'keyword', label: '关键词', priority: 1 },
  {
    type: 'select',
    name: 'status',
    label: '状态',
    priority: 0,
    options: [
      { label: '营业中', value: 'open' },
      { label: '筹备中', value: 'pending' },
    ],
  },
  { type: 'date', name: 'createdAt', label: '创建日期', priority: 2 },
  {
    type: 'select',
    name: 'owner',
    label: '负责人',
    options: [
      { label: 'Ada', value: 'ada' },
      { label: 'Lin', value: 'lin' },
    ],
  },
  { type: 'dateRange', name: 'period', label: '营业周期', span: 2 },
];

const initialValues: FilterValue = { status: 'open', owner: 'ada', period: ['2026-07-01', '2026-07-29'] };

export default function Demo() {
  const [draftValues, setDraftValues] = useState<FilterValue>(initialValues);
  const [activeValues, setActiveValues] = useState<FilterValue>(initialValues);

  return (
    <div className="sb-filter-bar-demo sb-filter-bar-demo--basic">
      <FilterBar
        fields={fields}
        value={draftValues}
        activeValues={activeValues}
        defaultValue={initialValues}
        defaultVisibleCount={3}
        onValuesChange={setDraftValues}
        onActiveValuesChange={setActiveValues}
      />
      <div className="sb-filter-bar-demo__evidence-grid" aria-live="polite">
        <div className="sb-filter-bar-demo__evidence">
          <span className="sb-filter-bar-demo__eyebrow">Draft</span>
          <code>{JSON.stringify(draftValues)}</code>
        </div>
        <div className="sb-filter-bar-demo__evidence">
          <span className="sb-filter-bar-demo__eyebrow">Active</span>
          <code>{JSON.stringify(activeValues)}</code>
        </div>
      </div>
    </div>
  );
}
