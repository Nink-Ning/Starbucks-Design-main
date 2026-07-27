import { Card, Link, Grid } from '@sbux/starbucks-design-react';

export default function Demo() {
  const extra = <Link>More</Link>;

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        padding: 40,
        backgroundColor: 'var(--color-fill-2)'
      }}
    >
      <Grid.Row gutter={20} style={{ marginBottom: 20 }}>
        <Grid.Col span={8}>
          <Card
            title="Arco Card"
            extra={extra}
            bordered={false}
            style={{
              width: '100%'
            }}
          >
            Card content
          </Card>
        </Grid.Col>
        <Grid.Col span={8}>
          <Card title="Arco Card" extra={extra} bordered={false} style={{ width: '100%' }}>
            Card content
          </Card>
        </Grid.Col>
        <Grid.Col span={8}>
          <Card title="Arco Card" extra={extra} bordered={false} style={{ width: '100%' }}>
            Card content
          </Card>
        </Grid.Col>
      </Grid.Row>
      <Grid.Row gutter={20}>
        <Grid.Col span={16}>
          <Card title="Arco Card" extra={extra} bordered={false} style={{ width: '100%' }}>
            Card content
          </Card>
        </Grid.Col>
        <Grid.Col span={8}>
          <Card title="Arco Card" extra={extra} bordered={false} style={{ width: '100%' }}>
            Card content
          </Card>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
}
