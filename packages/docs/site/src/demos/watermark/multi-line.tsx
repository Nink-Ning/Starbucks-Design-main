import { Watermark } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Watermark content={['Arco Design', 'ByteDance']}>
      <div style={{ height: 300 }}></div>
    </Watermark>
  );
}
