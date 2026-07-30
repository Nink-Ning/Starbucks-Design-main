import { useState } from 'react';
import { FilterBar } from '@sbux/starbucks-design-react';
import type { FilterFieldSchema, FilterValidationError, FilterValue } from '@sbux/starbucks-design-react';

const fields: FilterFieldSchema[] = [
  { type: 'input', name: 'keyword', label: '关键词', required: true, placeholder: '必填' },
  {
    type: 'input',
    name: 'storeCode',
    label: '门店编码',
    defaultValue: 'x',
    rules: [{ validator: (value) => (String(value ?? '').length < 4 ? '编码至少 4 位' : undefined) }],
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
  const [errors, setErrors] = useState<FilterValidationError[]>([]);
  const [activeValues, setActiveValues] = useState<FilterValue>({});

  return (
    <div className="sb-filter-bar-demo sb-filter-bar-demo--basic">
      <FilterBar
        fields={fields}
        defaultValue={{ storeCode: 'x' }}
        activeValues={activeValues}
        onActiveValuesChange={setActiveValues}
        onValidateFailed={setErrors}
      />
      <div className="sb-filter-bar-demo__evidence-grid" aria-live="polite">
        <div className="sb-filter-bar-demo__evidence">
          <span className="sb-filter-bar-demo__eyebrow">Errors</span>
          <code>{JSON.stringify(errors)}</code>
        </div>
        <div className="sb-filter-bar-demo__evidence">
          <span className="sb-filter-bar-demo__eyebrow">Active</span>
          <code>{JSON.stringify(activeValues)}</code>
        </div>
      </div>
    </div>
  );
}
