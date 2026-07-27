import { useState } from 'react';
import { AutoComplete } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [data, setData] = useState([]);

  const handleSearch = (inputValue) => {
    // or fetch options from server
    setData(inputValue ? new Array(5).fill(null).map(() => Math.random().toFixed(10).slice(2)) : []);
  };

  return (
    <AutoComplete
      placeholder="Please Enter"
      onSearch={handleSearch}
      data={data}
      filterOption={false}
      style={{ width: 154, marginRight: 20 }}
    />
  );
}
