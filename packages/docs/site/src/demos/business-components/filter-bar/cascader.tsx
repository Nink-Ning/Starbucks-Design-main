import { useState } from 'react';
import { FilterBar } from '@sbux/starbucks-design-react';
import type { FilterFieldSchema, FilterValue } from '@sbux/starbucks-design-react';

const fields: FilterFieldSchema[] = [
  {
    type: 'cascader',
    name: 'region',
    label: '区域',
    options: [
      {
        label: '华东',
        value: 'east',
        children: [
          { label: '上海', value: 'shanghai' },
          { label: '杭州', value: 'hangzhou' },
        ],
      },
      {
        label: '华南',
        value: 'south',
        children: [{ label: '深圳', value: 'shenzhen' }],
      },
    ],
  },
  {
    type: 'select',
    name: 'status',
    label: '状态',
    options: [
      { label: '营业中', value: 'open' },
      { label: '筹备中', value: 'pending' },
    ],
  },
];

export default function Demo() {
  const [activeValues, setActiveValues] = useState<FilterValue>({ region: ['east', 'shanghai'] });

  return (
    <div className="sb-filter-bar-demo sb-filter-bar-demo--basic">
      <FilterBar
        fields={fields}
        defaultValue={{ region: ['east', 'shanghai'] }}
        activeValues={activeValues}
        onActiveValuesChange={setActiveValues}
      />
      <div className="sb-filter-bar-demo__evidence" aria-live="polite">
        <span className="sb-filter-bar-demo__eyebrow">Active Cascader Path</span>
        <code>{JSON.stringify(activeValues)}</code>
      </div>
    </div>
  );
}
