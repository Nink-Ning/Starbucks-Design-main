import { Radio, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space size={40}>
      <Radio>Radio</Radio>
      <Radio checked disabled>
        Disabled Radio
      </Radio>
    </Space>
  );
}
