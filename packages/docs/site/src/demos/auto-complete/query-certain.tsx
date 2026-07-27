import { useState } from 'react';
import { AutoComplete, Input } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [data, setData] = useState([]);

  const handleSearch = (inputValue) => {
    if (inputValue) {
      setData(
        ['Group-1', 'Group-2', 'Group-3'].map((groupName, outerIndex) => (
          <AutoComplete.OptGroup key={outerIndex} label={groupName}>
            {new Array(3).fill(null).map((_, innerIndex) => {
              const value = `${inputValue}-${outerIndex + 1}-${innerIndex + 1}`;
              return (
                <AutoComplete.Option key={`${outerIndex}_${innerIndex}`} value={value}>
                  {value}
                </AutoComplete.Option>
              );
            })}
          </AutoComplete.OptGroup>
        ))
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
