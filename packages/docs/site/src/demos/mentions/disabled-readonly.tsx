import { Mentions, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space size={40}>
      <Mentions
        style={{ width: 154 }}
        readOnly
        defaultValue="@Nink"
        options={['Nink', 'Zero', 'Kevin']}
      />
      <Mentions
        style={{ width: 154 }}
        disabled
        defaultValue="@Nink"
        options={['Nink', 'Zero', 'Kevin']}
      />
    </Space>
  );
}
