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

const paragraphStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-secondary)',
  lineHeight: '22px'
};

export default function Demo() {
  return (
    <div style={shellStyle}>
      <Typography.Paragraph style={paragraphStyle}>运营数据按业务主题拆分，便于快速定位信息。</Typography.Paragraph>
      <Divider orientation="left">设计规范</Divider>
      <Typography.Paragraph style={paragraphStyle}>中间标题适合用于页面主内容的章节切换。</Typography.Paragraph>
      <Divider orientation="center">组件资产</Divider>
      <Typography.Paragraph style={paragraphStyle}>右侧标题可用于补充说明或收尾信息。</Typography.Paragraph>
      <Divider orientation="right">交付记录</Divider>
    </div>
  );
}
