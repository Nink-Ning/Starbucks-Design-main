import { useState } from 'react';
import { Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [str, setStr] = useState('点击编辑图标，更新门店公告内容。');
  return (
    <Typography>
      <Typography.Paragraph copyable>点击复制图标，复制 Starbucks Design 文案。</Typography.Paragraph>
      <Typography.Paragraph
        editable={{
          onChange: setStr
        }}
      >
        {str}
      </Typography.Paragraph>
      {[...new Array(6)].map((_, index) => {
        return (
          <Typography.Title editable heading={index + 1} style={{ margin: 0 }}>
            H{index + 1}. Starbucks Design 内容标题
          </Typography.Title>
        );
      })}
    </Typography>
  );
}
