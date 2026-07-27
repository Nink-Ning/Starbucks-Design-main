import React from 'react';
import { Button, Checkbox, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [checked, setChecked] = React.useState(false);
  return (
    <div>
      <Space size={40}>
        <Checkbox
          checked={checked}
        >
          Checkbox
        </Checkbox>
        <Checkbox checked={checked} disabled>
          disabled Checkbox
        </Checkbox>
      </Space>
      <div style={{ marginTop: 30 }}>
        <Button
          type="primary"
          onClick={() => {
            setChecked(!checked);
          }}
        >
          {checked ? 'unCheck' : 'Check'}
        </Button>
      </div>
    </div>
  );
}
