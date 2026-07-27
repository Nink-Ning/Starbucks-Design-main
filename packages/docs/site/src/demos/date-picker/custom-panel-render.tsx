import { DatePicker, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const panelRender = (panelNode) => (
    <div className="picker-panel-render-wrapper">
      {panelNode}
      <div
        style={{
          padding: '8px 12px',
          borderTop: '1px solid var(--color-neutral-3)',
          color: 'var(--color-text-2)',
        }}
      >
        Custom panel footer
      </div>
    </div>
  );

  return (
    <Space direction="vertical">
      <DatePicker style={{ width: 280 }} panelRender={panelRender} />
      <DatePicker.RangePicker style={{ width: 360 }} panelRender={panelRender} />
    </Space>
  );
}
