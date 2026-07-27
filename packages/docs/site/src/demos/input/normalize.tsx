import { Input, Space, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space wrap size={20}>
      <div>
        <Typography.Paragraph>trim whitespace when out of focus：</Typography.Paragraph>
        <Input
          placeholder="Enter something"
          onChange={v => { console.log('current value: ', v); }}
          normalizeTrigger={['onBlur']}
          normalize={v => v ? v.trim() : v}
          style={{ width: 350 }}
        />
      </div>
      <div>

        <Typography.Paragraph>trim whitespace when press enter：</Typography.Paragraph>
        <Input
          placeholder="Enter something"
          onChange={v => { console.log('current value: ', v); }}
          normalize={v => v ? v.trim() : v}
          normalizeTrigger={['onPressEnter']}
          style={{ width: 350 }}
        />
      </div>
    </Space>
  );
}
