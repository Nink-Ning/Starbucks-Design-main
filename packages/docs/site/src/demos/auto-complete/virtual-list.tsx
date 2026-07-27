import { useState } from 'react';
import { AutoComplete } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [data, setData] = useState([]);

  const handleSearch = (inputValue) => {
    setData(inputValue ? new Array(5000).fill(null).map((_, index) => `${inputValue}-${index}`) : []);
  };

  return (
    <AutoComplete
      placeholder="please enter something"
      onSearch={handleSearch}
      data={data}
      virtualListProps={{ height: 200, threshold: 20 }}
      style={{ width: 360 }}
    />
  );
}
