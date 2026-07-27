import { useState } from 'react';
import { Button, ColorPicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [value, setValue] = useState('#165DFF');

  return (
    <div>
      <div>
        <Button onClick={() => setValue('#165DFF')}>#165DFF</Button>
        <Button onClick={() => setValue('#165DFF88')}>#165DFF88</Button>
      </div>
      <div style={{ marginTop: 10 }} />
      <ColorPicker value={value} onChange={(value) => setValue(value)} showText />
    </div>
  );
}
