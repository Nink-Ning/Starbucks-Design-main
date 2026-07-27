import { useState } from 'react';
import { AutoComplete } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [options, setOptions] = useState([]);

  const handleSearch = (inputValue) => {
    setOptions(
      inputValue ? new Array(5).fill(null).map((_, index) => `${inputValue}_${index}`) : []
    );
  };

  return (
    <AutoComplete
      placeholder="Please Enter"
      style={{ width: 154 }}
      onSearch={handleSearch}
    >
      {options.map((option) => (
        <AutoComplete.Option key={option} value={option}>
          {option}
        </AutoComplete.Option>
      ))}
    </AutoComplete>
  );
}
