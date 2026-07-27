import { Card, Link, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space
      style={{
        padding: 40,
        backgroundColor: 'var(--color-fill-2)'
      }}
      size="large"
    >
      <Card style={{ width: 360 }} title="Arco Card" extra={<Link>More</Link>} bordered={false}>
        Card content
        <br />
        Card content
      </Card>
      <Card style={{ width: 360 }} title="Hover me" hoverable extra={<Link>More</Link>} bordered={false}>
        Card content
        <br />
        Card content
      </Card>
    </Space>
  );
}
