import { FilterBar } from '@sbux/starbucks-design-react';
import type { FilterFieldSchema } from '@sbux/starbucks-design-react';

const fields: FilterFieldSchema[] = [
  { type: 'input', name: 'keyword', label: '关键词', placeholder: '门店 / 编号' },
  {
    type: 'select',
    name: 'status',
    label: '状态',
    options: [
      { label: '营业中', value: 'open' },
      { label: '筹备中', value: 'pending' },
    ],
  },
  { type: 'date', name: 'createdAt', label: '创建日期' },
];

export default function Demo() {
  return (
    <div className="sb-filter-bar-demo sb-filter-bar-demo--state-grid">
      <div className="sb-filter-bar-demo__state-panel">
        <div className="sb-filter-bar-demo__section-head">
          <div className="sb-filter-bar-demo__title">Loading</div>
        </div>
        <FilterBar fields={fields} defaultValue={{ status: 'open' }} loading />
      </div>
      <div className="sb-filter-bar-demo__state-panel">
        <div className="sb-filter-bar-demo__section-head">
          <div className="sb-filter-bar-demo__title">Disabled</div>
        </div>
        <FilterBar fields={fields} defaultValue={{ status: 'open' }} disabled />
      </div>
    </div>
  );
}
