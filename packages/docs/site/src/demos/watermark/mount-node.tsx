import React from 'react';
import { Watermark } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [current, setCurrent] = React.useState('#demo-watermark-1');

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 16,
        width: '100%'
      }}
    >
      <div
        id="demo-watermark-1"
        style={{
          width: '100%',
          height: 300,
          lineHeight: '300px',
          textAlign: 'center',
          background: 'var(--color-primary-light)'
        }}
        onClick={() => {
          setCurrent('#demo-watermark-1');
        }}
      >
        点击将水印挂载到设计资产区域
      </div>
      <div
        id="demo-watermark-2"
        style={{
          width: '100%',
          height: 300,
          lineHeight: '300px',
          textAlign: 'center',
          background: 'var(--bg-color-secondarycomponent)'
        }}
        onClick={() => {
          setCurrent('#demo-watermark-2');
        }}
      >
        点击将水印挂载到交付预览区域
      </div>

      <Watermark getContainer={() => document.querySelector(current)} content="Starbucks DesignKit"></Watermark>
    </div>
  );
}
