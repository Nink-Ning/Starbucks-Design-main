import { useState } from 'react';
import { FilterBar } from '@sbux/starbucks-design-react';
import type { FilterFieldSchema, FilterValue } from '@sbux/starbucks-design-react';

const fields: FilterFieldSchema[] = [
  { type: 'date', name: 'createdAt', label: '创建日期', valueFormat: 'YYYY-MM-DD' },
  { type: 'dateRange', name: 'period', label: '统计周期', valueFormat: 'YYYY-MM-DD', span: 2 },
];

const initialValues: FilterValue = {
  createdAt: '2026-07-29',
  period: ['2026-07-01', '2026-07-29'],
};

export default function Demo() {
  const [activeValues, setActiveValues] = useState<FilterValue>(initialValues);

  return (
    <div className="sb-filter-bar-demo sb-filter-bar-demo--basic">
      <FilterBar
        fields={fields}
        defaultValue={initialValues}
        activeValues={activeValues}
        onActiveValuesChange={setActiveValues}
      />
      <div className="sb-filter-bar-demo__evidence" aria-live="polite">
        <span className="sb-filter-bar-demo__eyebrow">Active Date Values</span>
        <code>{JSON.stringify(activeValues)}</code>
      </div>
    </div>
  );
}
