import { useState } from 'react';
import { AutoComplete, Input } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [data, setData] = useState([]);

  const handleSearch = (inputValue) => {
    setData(
      inputValue && inputValue.trim()
        ? new Array(5).fill(null).map((_, index) => `${inputValue}_${index}`)
        : []
    );
  };

  return (
    <AutoComplete
      style={{ width: 320, height: 80 }}
      data={data}
      triggerElement={<Input.TextArea />}
      placeholder="Customize this with your words"
      onSearch={handleSearch}
    />
  );
}
