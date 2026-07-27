import { ColorPicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <ColorPicker defaultValue={'#165DFF'} size={'mini'} />
      <div style={{ marginTop: 10 }} />
      <ColorPicker defaultValue={'#165DFF'} size={'small'} />
      <div style={{ marginTop: 10 }} />
      <ColorPicker defaultValue={'#165DFF'} size={'default'} />
      <div style={{ marginTop: 10 }} />
      <ColorPicker defaultValue={'#165DFF'} size={'large'} />
    </div>
  );
}
