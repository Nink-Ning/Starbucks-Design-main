import { useState } from 'react';
import { Button, ColorPicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [value, setValue] = useState('#165DFF');

  return (
    <div>
      <ColorPicker
        defaultValue={'#165DFF'}
        triggerElement={({ value }) => {
          return <Button>Open Color Picker: {value}</Button>;
        }}
      ></ColorPicker>
    </div>
  );
}
