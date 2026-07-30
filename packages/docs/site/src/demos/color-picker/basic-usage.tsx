import { ColorPicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <ColorPicker defaultValue={'#00754A'} />
      <div style={{ marginTop: 10 }} />
      <ColorPicker defaultValue={'#00754A'} showText />
    </div>
  );
}
