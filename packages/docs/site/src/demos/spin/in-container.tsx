import { useState } from 'react';
import { Button, Space, Spin, Card, Link } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Button style={{ display: 'block', marginBottom: 24 }} onClick={() => setLoading(!loading)}>
        {`Loading: ${loading}`}
      </Button>
      <Space>
        <Spin loading={loading}>
          <Card style={{ width: '100%' }} title="Arco Card" extra={<Link> More </Link>}>
            ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around the world.
            Toutiao started out as a news recommendation engine and gradually evolved into a platform delivering content
            in various formats.
          </Card>
        </Spin>
        <Spin loading={loading}>
          <Card style={{ width: '100%' }} title="Arco Card" extra={<Link> More </Link>}>
            ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around the world.
            Toutiao started out as a news recommendation engine and gradually evolved into a platform delivering content
            in various formats.
          </Card>
        </Spin>
      </Space>
      <Spin loading={loading} style={{ display: 'block', marginTop: 8 }}>
        <Card title="Arco Card" extra={<Link> More </Link>}>
          ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around the world. Toutiao
          started out as a news recommendation engine and gradually evolved into a platform delivering content in
          various formats.
        </Card>
      </Spin>
    </>
  );
}
