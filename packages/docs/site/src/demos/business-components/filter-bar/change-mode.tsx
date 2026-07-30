import { useState } from 'react';
import { FilterBar } from '@sbux/starbucks-design-react';
import type { FilterEventMeta, FilterFieldSchema, FilterValue } from '@sbux/starbucks-design-react';

const fields: FilterFieldSchema[] = [
  { type: 'input', name: 'keyword', label: '关键词', placeholder: '输入后自动查询' },
  {
    type: 'select',
    name: 'status',
    label: '状态',
    options: [
      { label: '营业中', value: 'open' },
      { label: '筹备中', value: 'pending' },
    ],
  },
  { type: 'dateRange', name: 'period', label: '统计周期', valueFormat: 'YYYY-MM-DD', span: 2 },
];

const initialValues: FilterValue = { status: 'open', period: ['2026-07-01', '2026-07-29'] };

export default function Demo() {
  const [draftValues, setDraftValues] = useState<FilterValue>(initialValues);
  const [activeValues, setActiveValues] = useState<FilterValue>(initialValues);
  const [events, setEvents] = useState<string[]>(['初始化 active snapshot']);
  const pushEvent = (label: string, values: FilterValue, meta: FilterEventMeta) => {
    setEvents((previous) => [`${label}: ${meta.source} ${JSON.stringify(values)}`, ...previous].slice(0, 5));
  };

  return (
    <div className="sb-filter-bar-demo sb-filter-bar-demo--basic">
      <FilterBar
        fields={fields}
        value={draftValues}
        activeValues={activeValues}
        defaultValue={initialValues}
        submitMode="change"
        debounceMs={300}
        onValuesChange={(values, meta) => {
          setDraftValues(values);
          pushEvent('draft', values, meta);
        }}
        onActiveValuesChange={setActiveValues}
        onSubmit={(snapshot, meta) => pushEvent('submit', snapshot, meta)}
      />
      <div className="sb-filter-bar-demo__evidence-grid" aria-live="polite">
        <div className="sb-filter-bar-demo__evidence">
          <span className="sb-filter-bar-demo__eyebrow">Active</span>
          <code>{JSON.stringify(activeValues)}</code>
        </div>
        <div className="sb-filter-bar-demo__evidence">
          <span className="sb-filter-bar-demo__eyebrow">Event Order</span>
          <ol>
            {events.map((event, index) => <li key={`${event}-${index}`}>{event}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
}
