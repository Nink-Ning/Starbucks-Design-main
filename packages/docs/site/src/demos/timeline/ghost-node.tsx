import React from 'react';
import { Grid, Checkbox, Timeline } from '@sbux/starbucks-design-react';
import { IconFire } from '@sbux/starbucks-design-react/icon';

export default function Demo() {

  const [pendingProps, setPendingProps] = React.useState({});
  return (
    <div>
      <Grid.Row
        align="center"
        style={{ marginBottom: 24, }} >
        <Checkbox
          checked={pendingProps.direction==='horizontal'}
          onChange={(v) => {
            setPendingProps({
              ...pendingProps,
              direction: v ? 'horizontal' : 'vertical',
            });
          }}
        >
          horizontal &nbsp; &nbsp;
        </Checkbox>

        <Checkbox
          checked={!!pendingProps.reverse}
          onChange={(v) => {
            setPendingProps({ ...pendingProps, reverse: v });
          }}
        >
          reverse &nbsp; &nbsp;
        </Checkbox>

        <Checkbox
          checked={!!pendingProps.pending}
          onChange={(v) => {
            setPendingProps({
              ...pendingProps,
              pending: v ? '等待门店反馈' : false,
            });
          }}
        >
          pending &nbsp; &nbsp;
        </Checkbox>

        <Checkbox
          checked={!!pendingProps.pendingDot}
          onChange={(v) => {
            const newProps = { ...pendingProps };
            delete newProps.pendingDot;

            if (v) {
              newProps.pendingDot = (
                <IconFire
                  style={{
                    color: 'var(--color-danger)',
                  }}
                />
              );
            }

            setPendingProps(newProps);
          }}
        >
          custom pendingDot
        </Checkbox>
      </Grid.Row>
      <Timeline pending {...pendingProps}>
        <Timeline.Item label="2026-03-10" dotColor="var(--color-success)">
          浓缩咖啡豆完成烘焙
        </Timeline.Item>
        <Timeline.Item label="2026-05-12" dotColor="var(--color-danger)">
          冷萃桶配送延迟
        </Timeline.Item>
        <Timeline.Item label="2026-09-30">门店活动复盘完成</Timeline.Item>
      </Timeline>
    </div>
  );
}
