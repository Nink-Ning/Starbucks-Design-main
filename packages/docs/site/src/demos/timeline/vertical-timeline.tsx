import React from 'react';
import { Grid, Typography, Radio, Timeline } from '@sbux/starbucks-design-react';

export default function Demo() {

  const coffeeIconStyle: React.CSSProperties = {
    width: 40,
    height: 40,
    margin: '0 12px 12px 12px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    boxSizing: 'border-box',
    background: 'var(--color-primary-light)',
    color: 'var(--color-primary)',
    fontSize: 20,
    lineHeight: '40px',
  };

  const descStyle: React.CSSProperties = {
    fontSize: 12,
    color: 'var(--color-text-secondary)',
  };

  const [mode, setMode] = React.useState('left');
  return (
    <div>
      <Grid.Row align="center" style={{ marginBottom: 24 }}>
        <Typography.Text>mode: &nbsp; &nbsp;</Typography.Text>
        <Radio.Group
          value={mode}
          onChange={setMode}
          options={[
            {
              label: 'left',
              value: 'left',
            },
            {
              label: 'right',
              value: 'right',
            },
            {
              label: 'alternate',
              value: 'alternate',
            },
          ]}
        />
      </Grid.Row>
      <Timeline mode={mode} labelPosition="relative">
        <Timeline.Item label="2026-03">
          <Grid.Row style={{ display: 'inline-flex', alignItems: 'center' }}>
            <div style={coffeeIconStyle}>☕</div>
            <div style={{ marginBottom: 12 }}>
              经典拿铁
              <div style={descStyle}>春季主推饮品上新</div>
            </div>
          </Grid.Row>
        </Timeline.Item>
        <Timeline.Item label="2026-05">
          <Grid.Row style={{ display: 'inline-flex', alignItems: 'center' }}>
            <div style={{ ...coffeeIconStyle, background: 'var(--bg-color-component)' }}>🧊</div>
            <div style={{ marginBottom: 12 }}>
              冷萃咖啡
              <div style={descStyle}>夏季冰饮物料到店</div>
            </div>
          </Grid.Row>
        </Timeline.Item>
        <Timeline.Item label="2026-09">
          <Grid.Row style={{ display: 'inline-flex', alignItems: 'center' }}>
            <div style={{ ...coffeeIconStyle, background: 'var(--bg-color-secondarycomponent-active)' }}>🍵</div>
            <div style={{ marginBottom: 12 }}>
              抹茶星冰乐
              <div style={descStyle}>会员日限定活动开启</div>
            </div>
          </Grid.Row>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
