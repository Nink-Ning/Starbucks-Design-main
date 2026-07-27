import { InputTag, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space direction="vertical" size="large">
      <InputTag
        defaultValue={['test']}
        style={{ width: 320 }}
        placeholder="Please Enter"
        disabled
      />
      <InputTag
        defaultValue={['test']}
        style={{ width: 320 }}
        placeholder="Please Enter"
        readOnly
      />
      <InputTag
        defaultValue={['test']}
        style={{ width: 320 }}
        placeholder="Please Enter"
        status="error"
      />
    </Space>
  );
}
