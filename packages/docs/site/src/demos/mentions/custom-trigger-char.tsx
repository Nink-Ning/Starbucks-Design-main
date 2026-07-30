import { Mentions, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space size={40}>
      <Mentions
        style={{ width: 154, marginBottom: 10 }}
        placeholder="输入 @Nink"
        options={['Nink', 'Zero', 'Kevin']}
      />
      <Mentions
        style={{ width: 154, marginBottom: 10 }}
        prefix="#"
        placeholder="Input #"
        options={['Nink', 'Zero', 'Kevin']}
      />
      <Mentions
        style={{ width: 154, marginBottom: 10 }}
        prefix="*"
        placeholder="Input *"
        options={['Nink', 'Zero', 'Kevin']}
      />
      <Mentions
        style={{ width: 154, marginBottom: 10 }}
        prefix="${"
        placeholder="Input ${"
        options={['Nink', 'Zero', 'Kevin']}
      />
    </Space>
  );
}
