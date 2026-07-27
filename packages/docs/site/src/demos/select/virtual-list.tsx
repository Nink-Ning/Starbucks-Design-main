import { Select, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const options = new Array(10000).fill(null).map((value, index) => `Item ${index}`);
  return (
    <>
      <Typography.Title heading={6}>10000 items</Typography.Title>
      <Select
        mode="multiple"
        allowCreate
        placeholder="Select a tag"
        allowClear
        style={{ width: 345 }}
      >
        {options.map((option) => (
          <Select.Option key={option} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </>
  );
}
