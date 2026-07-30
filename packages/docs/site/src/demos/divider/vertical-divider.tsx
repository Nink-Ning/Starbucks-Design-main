import type { CSSProperties } from 'react';
import { Divider, Typography } from '@sbux/starbucks-design-react';

const shellStyle: CSSProperties = {
  boxSizing: 'border-box',
  width: '100%',
  padding: 24,
  color: 'var(--color-text-primary)',
  background: 'var(--color-bg-2)',
  border: '1px solid var(--color-border-2)',
  borderRadius: 8
};

export default function Demo() {
  return (
    <div style={shellStyle}>
      <Typography.Text>设计规范</Typography.Text>
      <Divider type="vertical" />
      <Typography.Text>组件资产</Typography.Text>
      <Divider type="vertical" />
      <Typography.Text>交付记录</Typography.Text>
    </div>
  );
}
