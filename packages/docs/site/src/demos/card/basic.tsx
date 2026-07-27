import { Card, Link } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div style={{ display: 'flex' }}>
      <Card style={{ width: 360 }} title="Arco Card" extra={<Link>More</Link>}>
        ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around the world. Toutiao
        started out as a news recommendation engine and gradually evolved into a platform delivering content in various
        formats.
      </Card>
    </div>
  );
}
