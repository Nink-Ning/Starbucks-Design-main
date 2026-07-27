import { useState } from 'react';
import { AutoComplete, Tooltip } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [value, setValue] = useState('Beijing');
  return (
    <Tooltip trigger="focus" content="只有当选中或者输入Beijing的时候才改变值，不然重置为空">
      <AutoComplete
        placeholder="请输入..."
        data={[
          {
            name: '北京',
            value: 'Beijing',
            other: 'other custom data',
          },
        ]}
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
        onBlur={() => {
          setValue((value) => (value === 'Beijing' ? value : ''));
        }}
        style={{ width: 154 }}
      />
    </Tooltip>
  );
}
