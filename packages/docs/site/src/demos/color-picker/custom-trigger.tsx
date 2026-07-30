import { useState } from 'react';
import { Button, ColorPicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [value, setValue] = useState('#00754A');

  return (
    <div>
      <ColorPicker
        defaultValue={'#00754A'}
        triggerElement={({ value }) => {
          return <Button>Open Color Picker: {value}</Button>;
        }}
      ></ColorPicker>
    </div>
  );
}
