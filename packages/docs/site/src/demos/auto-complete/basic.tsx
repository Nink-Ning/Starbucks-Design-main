import { useState } from 'react';
import { AutoComplete } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [data, setData] = useState([]);

  const handleSearch = (inputValue) => {
    setData(inputValue ? new Array(5).fill(null).map((_, index) => `${inputValue}_${index}`) : []);
  };

  return (
    <AutoComplete
      placeholder="Please Enter"
      onSearch={handleSearch}
      data={data}
      style={{ width: 154, marginRight: 20 }}
    />
  );
}
