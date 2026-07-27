import { Card, Link, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space>
      <Card style={{ width: 360 }} title="Arco Card" hoverable extra={<Link>More</Link>}>
        Card content
        <br />
        Card content
      </Card>
      <Card
        style={{ width: 360 }}
        className="card-custom-hover-style"
        title="Custom hover style"
        hoverable
        extra={<Link>More</Link>}
      >
        Card content <br /> Card content
      </Card>
    </Space>
  );
}
