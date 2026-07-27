import { Select, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const options = [];

  for (let i = 10; i < 24; i++) {
    options.push(i.toString(36) + i);
  }

  return (
    <Space size="large">
      <Select allowCreate placeholder="Create an item" allowClear style={{ width: 345 }}>
        {options.map((option) => (
          <Select.Option key={option} value={option} disabled={option === 'b11' ? true : false}>
            {option}
          </Select.Option>
        ))}
      </Select>

      <Select
        allowClear
        mode="multiple"
        placeholder="Create an item"
        defaultValue={['a10', 'b11']}
        allowCreate={{
          formatter: (inputValue, creating) => {
            return {
              value: inputValue,
              label: `${creating ? 'Enter to create: ' : 'Created: '}${inputValue}`
            };
          },
        }}
        style={{ width: 345 }}
      >
        {options.map((option) => (
          <Select.Option key={option} value={option} disabled={option === 'b11' ? true : false}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
}
