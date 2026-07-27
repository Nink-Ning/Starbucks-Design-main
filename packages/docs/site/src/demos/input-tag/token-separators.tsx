import { InputTag, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Typography.Paragraph copyable>
        Beijing,Shenzhen|Nanjing/Xi'an
      </Typography.Paragraph>
      <InputTag
        allowClear
        tokenSeparators={[',', '|', '/']}
        placeholder="Paste text here"
        style={{ width: 350 }}
      />
    </div>
  );
}
