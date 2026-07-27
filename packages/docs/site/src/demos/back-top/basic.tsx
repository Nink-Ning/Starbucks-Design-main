import { BackTop, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div style={{ position: 'relative', padding: '8px 12px' }}>
      <BackTop
        visibleHeight={30}
        style={{ position: 'absolute' }}
        target={() => document.getElementById('custom_backtop0')}
      />
      <Typography.Paragraph>
        The button will appear in the bottom corner of the scrolling area
      </Typography.Paragraph>
      <div
        id="custom_backtop0"
        style={{ height: 300, overflow: 'auto' }}
      >
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
      </div>
    </div>
  );
}
