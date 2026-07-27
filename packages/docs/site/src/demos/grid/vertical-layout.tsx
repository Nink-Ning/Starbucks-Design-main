import { Grid, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const rowStyle = {
    marginBottom: 40,
    backgroundColor: 'var(--color-fill-2)',
  };
  const titleStyle = {
    fontSize: 12,
    color: '#141f33',
  };

  return (
    <div style={{ width: '100%' }}>
      <p style={titleStyle}>
        <Typography.Text>垂直顶部对齐</Typography.Text>
      </p>
      <Grid.Row className="grid-demo" align="start" style={rowStyle}>
        <Grid.Col span={6} style={{ height: 90, lineHeight: '90px' }}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6} style={{ height: 48, lineHeight: '48px' }}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6} style={{ height: 120, lineHeight: '120px' }}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6} style={{ height: 60, lineHeight: '60px' }}>
          <div>col - 6</div>
        </Grid.Col>
      </Grid.Row>
      <p style={titleStyle}>
        <Typography.Text>垂直居中对齐</Typography.Text>
      </p>
      <Grid.Row className="grid-demo" align="center" style={rowStyle}>
        <Grid.Col span={6} style={{ height: 90, lineHeight: '90px' }}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6} style={{ height: 48, lineHeight: '48px' }}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6} style={{ height: 120, lineHeight: '120px' }}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6} style={{ height: 60, lineHeight: '60px' }}>
          <div>col - 6</div>
        </Grid.Col>
      </Grid.Row>
      <p style={titleStyle}>
        <Typography.Text>垂直底部对齐</Typography.Text>
      </p>
      <Grid.Row className="grid-demo" align="end" style={rowStyle}>
        <Grid.Col span={6} style={{ height: 90, lineHeight: '90px' }}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6} style={{ height: 48, lineHeight: '48px' }}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6} style={{ height: 120, lineHeight: '120px' }}>
          <div>col - 6</div>
        </Grid.Col>
        <Grid.Col span={6} style={{ height: 60, lineHeight: '60px' }}>
          <div>col - 6</div>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
}
