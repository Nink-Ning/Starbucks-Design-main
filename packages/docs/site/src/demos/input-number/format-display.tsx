import { useState } from 'react';
import { InputNumber } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [value, setValue] = useState(12000);
  const [delayValue, setDelayValue] = useState(12000);
  return (
    <div>
      <InputNumber
        style={{ width: 160, margin: '10px 24px 10px 0' }}
        min={0}
        max={1000000000}
        step={1000}
        value={value}
        onChange={setValue}
        prefix="¥"
        // 正则表达式：(/\B(?=(\d{3})+(?!\d))/g, ',')}
        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={(value) => value.replace(/,/g, '')}
      />
      <InputNumber
        style={{ width: 160, margin: '10px 24px 10px 0' }}
        min={0}
        max={1000000000}
        step={1000}
        value={delayValue}
        onChange={setDelayValue}
        prefix="¥"
        formatter={(value, { userTyping, input }) =>
          userTyping ? input : `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }
        parser={(value) => value.replace(/,/g, '')}
      />
    </div>
  );
}
