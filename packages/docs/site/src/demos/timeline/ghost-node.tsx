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
              pending: v ? 'This is a pending dot' : false,
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
                    color: '#e70a0a',
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
        <Timeline.Item label="2017-03-10" dotColor="#52C419">
          The first milestone
        </Timeline.Item>
        <Timeline.Item label="2018-05-12" dotColor="#F5222D">
          The second milestone
        </Timeline.Item>
        <Timeline.Item label="2020-09-30">The third milestone</Timeline.Item>
      </Timeline>
    </div>
  );
}
