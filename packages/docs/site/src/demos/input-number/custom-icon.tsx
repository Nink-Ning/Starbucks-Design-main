import { InputNumber, Space } from '@sbux/starbucks-design-react';
import { IconPlus, IconMinus } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space direction="vertical" size="large">
      <InputNumber
        mode="button"
        style={{ width: 320 }}
        placeholder="Please enter something"
        icons={{ plus: <IconPlus />, minus: <IconMinus /> }}
      />
    </Space>
  );
}
