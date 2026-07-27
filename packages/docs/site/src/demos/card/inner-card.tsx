import { Card, Link } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Card title="Arco Card">
      <Card style={{ marginBottom: 20 }} title="Inner Card Title" extra={<Link>More</Link>}>
        Inner Card Content
      </Card>
      <Card title="Inner Card Title" extra={<Link>More</Link>}>
        Inner Card Content
      </Card>
    </Card>
  );
}
