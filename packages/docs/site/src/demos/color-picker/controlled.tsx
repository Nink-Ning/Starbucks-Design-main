import { useState } from 'react';
import { Button, ColorPicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [value, setValue] = useState('#00754A');

  return (
    <div>
      <div>
        <Button onClick={() => setValue('#00754A')}>#00754A</Button>
        <Button onClick={() => setValue('#00754A88')}>#00754A88</Button>
      </div>
      <div style={{ marginTop: 10 }} />
      <ColorPicker value={value} onChange={(value) => setValue(value)} showText />
    </div>
  );
}
