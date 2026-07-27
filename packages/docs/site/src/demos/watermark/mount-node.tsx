import React from 'react';
import { Watermark, Grid } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [current, setCurrent] = React.useState('#demo-watermark-1');

  return (
    <Grid.Row justify="space-between">
      <div
        id="demo-watermark-1"
        style={{
          width: 400,
          height: 300,
          lineHeight: '300px',
          textAlign: 'center',
          background: 'var(--color-primary-light-1)'
        }}
        onClick={() => {
          setCurrent('#demo-watermark-1');
        }}
      >
        Click to mount the watermark here
      </div>
      <div
        id="demo-watermark-2"
        style={{
          width: 400,
          height: 300,
          lineHeight: '300px',
          textAlign: 'center',
          background: 'var(--color-warning-light-1)'
        }}
        onClick={() => {
          setCurrent('#demo-watermark-2');
        }}
      >
        Click to mount the watermark here
      </div>

      <Watermark getContainer={() => document.querySelector(current)} content="Arco Design"></Watermark>
    </Grid.Row>
  );
}
