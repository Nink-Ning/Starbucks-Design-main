import { Mentions, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space size={40}>
      <Mentions
        style={{ width: 154 }}
        readOnly
        defaultValue="Bytedance"
        options={['Bytedance', 'Bytedesign', 'Bytenumner']}
      />
      <Mentions
        style={{ width: 154 }}
        disabled
        defaultValue="Bytedance"
        options={['Bytedance', 'Bytedesign', 'Bytenumner']}
      />
    </Space>
  );
}
