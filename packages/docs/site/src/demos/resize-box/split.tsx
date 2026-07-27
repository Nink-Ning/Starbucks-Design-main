import { useState } from 'react';
import { ResizeBox, Space, Radio, Tag } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [direction, setDirection] = useState('horizontal');
  return (
    <Space direction="vertical" size={20}>
      <Radio.Group
        type="button"
        value={direction}
        onChange={setDirection}
        options={['horizontal', 'vertical', 'horizontal-reverse', 'vertical-reverse']}
      />
      <ResizeBox.Split
        direction={direction}
        style={{
          height: 300,
          width: 300,
          border: '1px solid var(--color-border)',
        }}
        max={0.8}
        min={0.2}
        panes={[
          <Tag key="first" color="arcoblue">
            Fist
          </Tag>,
          <Tag key="second" color="green">
            Second
          </Tag>,
        ]}
      />
    </Space>
  );
}
