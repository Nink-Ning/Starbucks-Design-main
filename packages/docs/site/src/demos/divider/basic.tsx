import type { CSSProperties } from 'react';
import { Divider, Typography } from '@sbux/starbucks-design-react';
import { IconFileImage, IconUser, IconPen } from '@sbux/starbucks-design-react/icon';

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

const rowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center'
};

const avatarStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  marginRight: 16,
  color: 'var(--color-primary)',
  fontSize: 16,
  background: 'var(--color-fill-2)',
  borderRadius: '50%'
};

const contentStyle: CSSProperties = {
  flex: 1,
  color: 'var(--color-text-secondary)',
  fontSize: 12,
  lineHeight: '20px'
};

const halfDividerStyle: CSSProperties = {
  left: 56,
  width: 'calc(100% - 56px)',
  minWidth: 'auto',
  margin: '16px 0'
};

export default function Demo() {
  return (
    <>
      <div style={shellStyle}>
        <Typography.Paragraph style={paragraphStyle}>
          门店首页会按照运营目标组织信息层级，核心指标优先展示。
        </Typography.Paragraph>
        <Divider />
        <Typography.Paragraph style={paragraphStyle}>
          分割线用于拆分不同业务模块，让阅读节奏保持清晰。
        </Typography.Paragraph>
        <Divider
          style={{
            borderBottomStyle: 'dashed'
          }}
        />
        <Typography.Paragraph style={paragraphStyle}>
          虚线样式适合表达弱分组关系，例如补充说明或临时提示。
        </Typography.Paragraph>
        <Divider
          style={{
            borderBottomWidth: 2,
            borderBottomStyle: 'dotted'
          }}
        />
        <Typography.Paragraph style={paragraphStyle}>
          点状分割线可用于视觉权重更轻的内容间隔。
        </Typography.Paragraph>
      </div>
      <div style={{ ...shellStyle, marginTop: 24 }}>
        <div style={rowStyle}>
          <span style={avatarStyle}>
            <IconFileImage />
          </span>
          <div style={contentStyle}>
            <Typography.Title heading={6}>设计稿评审</Typography.Title>2026-07-24 10:30
          </div>
        </div>
        <Divider style={halfDividerStyle} />
        <div style={rowStyle}>
          <span style={avatarStyle}>
            <IconUser />
          </span>
          <div style={contentStyle}>
            <Typography.Title heading={6}>组件联调</Typography.Title>2026-07-24 14:00
          </div>
        </div>
        <Divider style={halfDividerStyle} />
        <div style={rowStyle}>
          <span style={avatarStyle}>
            <IconPen />
          </span>
          <div style={contentStyle}>
            <Typography.Title heading={6}>交付验收</Typography.Title>2026-07-25 09:15
          </div>
        </div>
      </div>
    </>
  );
}
