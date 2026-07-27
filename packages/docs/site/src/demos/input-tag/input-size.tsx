import { useState } from 'react';
import { InputTag, Radio } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [size, setSize] = useState('default');
  return (
    <div>
      <Radio.Group
        style={{ marginBottom: 20, borderRadius: 4 }}
        type="button"
        name="size"
        value={size}
        onChange={(value) => setSize(value)}
      >
        <Radio value="mini">mini</Radio>
        <Radio value="small">small</Radio>
        <Radio value="default">default</Radio>
        <Radio value="large">large</Radio>
      </Radio.Group>
      <br />
      <InputTag
        allowClear
        size={size}
        defaultValue={['Beijing', 'Shanghai']}
        placeholder="Please input"
        style={{ maxWidth: 350, marginRight: 20 }}
      />
    </div>
  );
}
