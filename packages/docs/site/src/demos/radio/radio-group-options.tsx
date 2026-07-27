import { Radio, Space } from '@sbux/starbucks-design-react';

const plainOptions = ['plain 1', 'plain 2', 'plain 3'];
const options = [
  { label: 'option 1', value: '1' },
  { label: 'option 2', value: '2' },
  { label: 'option 3', value: '3', disabled: true },
];

export default function Demo() {
  return (
    <Space direction="vertical" size="large">
      <Radio.Group options={plainOptions} defaultValue="plain 1" />
      <Radio.Group options={options} defaultValue="1" />
    </Space>
  );
}
