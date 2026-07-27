import { useState } from 'react';
import { Button, Spin, Card } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Button style={{ display: 'block', marginBottom: 24 }} onClick={() => setLoading(!loading)}>
        {`Loading: ${loading}`}
      </Button>
      <Spin delay={500} loading={loading}>
        <Card
          style={{ width: 360 }}
          title="Delay 500ms"
          extra={
            <a href="#" style={{ color: '#165DFF', textDecoration: 'none' }}>
              More
            </a>
          }
        >
          ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around the world. Toutiao
          started out as a news recommendation engine and gradually evolved into a platform delivering content in
          various formats.
        </Card>
      </Spin>
    </>
  );
}
