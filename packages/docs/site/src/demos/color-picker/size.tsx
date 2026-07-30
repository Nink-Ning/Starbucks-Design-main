import { ColorPicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <ColorPicker defaultValue={'#00754A'} size={'mini'} />
      <div style={{ marginTop: 10 }} />
      <ColorPicker defaultValue={'#00754A'} size={'small'} />
      <div style={{ marginTop: 10 }} />
      <ColorPicker defaultValue={'#00754A'} size={'default'} />
      <div style={{ marginTop: 10 }} />
      <ColorPicker defaultValue={'#00754A'} size={'large'} />
    </div>
  );
}
