import { BackTop, Button, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div style={{ position: 'relative', padding: '8px 12px' }}>
      <BackTop
        style={{ position: 'absolute' }}
        visibleHeight={30}
        target={() => document.getElementById('custom_backtop')}
      >
        <Button
          type="primary"
          iconOnly
          style={{ width: 40, height: 40 }}
        >
          UP
        </Button>
      </BackTop>
      <div
        id="custom_backtop"
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
        <Typography.Paragraph>This is the content</Typography.Paragraph>
        <Typography.Paragraph>This is the content</Typography.Paragraph>
      </div>
    </div>
  );
}
