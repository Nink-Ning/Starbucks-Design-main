import { useState } from 'react';
import { Pagination, Radio } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [size, setSize] = useState('default');
  return (
    <div>
      <Radio.Group
        value={size}
        options={['large', 'default', 'small', 'mini']}
        onChange={(value) => setSize(value)}
        type="button"
        style={{
          marginBottom: 20,
        }}
      />
      <Pagination size={size} total={50} showTotal showJumper sizeCanChange />
    </div>
  );
}
