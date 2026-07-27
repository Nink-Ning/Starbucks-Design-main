import { Spin, Card, Link } from '@sbux/starbucks-design-react';
import { IconLoading } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Spin loading={true} size={30} icon={<IconLoading />}>
      <Card style={{ width: 360 }} title="Arco Card" extra={<Link> More </Link>}>
        ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around the world. Toutiao
        started out as a news recommendation engine and gradually evolved into a platform delivering content in various
        formats.
      </Card>
    </Spin>
  );
}
