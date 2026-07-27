import { useState } from 'react';
import { AutoComplete, Input } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [data, setData] = useState([]);

  const handleSearch = (inputValue) => {
    if (inputValue) {
      setData(
        new Array(3).fill(null).map((_, index) => {
          const value = `${inputValue}-${index + 1}`;
          return (
            <AutoComplete.Option key={index} value={value}>
              <span>{value}</span>
              <span
                style={{
                  float: 'right',
                }}
              >{`${~~(Math.random() * 1000)} results`}</span>
            </AutoComplete.Option>
          );
        })
      );
    } else {
      setData([]);
    }
  };

  return (
    <div>
      <AutoComplete
        style={{ width: 320 }}
        data={data}
        placeholder="Please Enter"
        triggerElement={<Input.Search />}
        onSearch={handleSearch}
      />
    </div>
  );
}
