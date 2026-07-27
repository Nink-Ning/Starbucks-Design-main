import { Grid, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const rowStyle = {
    marginBottom: 40,
    background: 'var(--color-fill-2)',
  };
  const titleStyle = {
    fontSize: 12,
    color: '#141f33',
  };

  return (
    <div style={{ width: '100%' }}>
      <p style={titleStyle}>
        <Typography.Text>容器左排列</Typography.Text>
      </p>
      <Grid.Row className="grid-demo" justify="start" style={rowStyle}>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
      </Grid.Row>
      <p style={titleStyle}>
        <Typography.Text>容器居中排列</Typography.Text>
      </p>
      <Grid.Row className="grid-demo" justify="center" style={rowStyle}>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
      </Grid.Row>
      <p style={titleStyle}>
        <Typography.Text>容器右排列</Typography.Text>
      </p>
      <Grid.Row className="grid-demo" justify="end" style={rowStyle}>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
      </Grid.Row>
      <p style={titleStyle}>
        <Typography.Text>容器分散排列</Typography.Text>
      </p>
      <Grid.Row className="grid-demo" justify="space-around" style={rowStyle}>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
      </Grid.Row>
      <p style={titleStyle}>
        <Typography.Text>容器等距排列</Typography.Text>
      </p>
      <Grid.Row className="grid-demo" justify="space-between" style={rowStyle}>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
        <Grid.Col span={4}>
          <div>col - 4</div>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
}
