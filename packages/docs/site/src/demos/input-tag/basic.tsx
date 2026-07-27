import { InputTag, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Space style={{ marginBottom: 20 }}>
        <InputTag
          allowClear
          placeholder="Input and press Enter"
          style={{ width: 350 }}
        />
        <InputTag allowClear placeholder="Disabled" disabled style={{ width: 350 }} />
      </Space>
      <Space style={{ marginBottom: 20 }}>
        <InputTag
          allowClear
          placeholder="Readonly"
          readOnly
          style={{ width: 350 }}
        />
        <InputTag allowClear placeholder="Error" status="error" style={{ width: 350 }} />
      </Space>
      <InputTag allowClear placeholder="Warning" status="warning" style={{ width: 350 }} />
    </div>
  );
}
