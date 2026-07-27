import { Select } from '@sbux/starbucks-design-react';

export default function Demo() {
  const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];
  return (
    <Select placeholder="Select" style={{ width: 154 }} allowClear>
      {options.map((option, index) => (
        <Select.Option key={option} disabled={index === 3} value={option}>
          {option}
        </Select.Option>
      ))}
    </Select>
  );
}
