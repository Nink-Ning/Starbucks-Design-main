import { ColorPicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <ColorPicker defaultValue={'#00754A'} disabledAlpha />
      <br />
      <ColorPicker defaultValue={'#00754A80'} disabledAlpha />
    </div>
  );
}
