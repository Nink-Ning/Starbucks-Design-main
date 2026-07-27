import { useState } from 'react';
import { Select } from '@sbux/starbucks-design-react';

export default function Demo() {
  const OPTIONS = new Array(10).fill(null).map((_, index) => `Option ${index + 1}`);
  const [options, setOptions] = useState(OPTIONS);
  return (
    <>
      <Select
        placeholder="Select an item"
        style={{ width: 345, marginRight: 20 }}
        mode="multiple"
        onChange={(value) => setOptions(OPTIONS.filter((option) => value.indexOf(option) === -1))}
      >
        {options.map((option, index) => (
          <Select.Option wrapperClassName="select-demo-hide-option-checkbox" key={index} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </>
  );
}
