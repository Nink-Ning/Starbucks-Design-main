import { Select } from '@sbux/starbucks-design-react';

export default function Demo() {
  const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen','a', 'b'];
  return (
    <Select
      placeholder="Select city"
      style={{ width: 345 }}
      mode="multiple"
      dragToSort
      defaultValue={options.slice(0, 3)}
      maxTagCount={3}
    >
      {options.map((option, index) => (
        <Select.Option key={option} value={option}>
          {option}
        </Select.Option>
      ))}
    </Select>
  );
}
