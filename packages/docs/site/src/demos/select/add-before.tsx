import { Message, Select, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Tianjin'];
  return (
    <Space size="large">
      <Select
        addBefore="Select city"
        placeholder="Select city"
        style={{ width: 300 }}
        onChange={(value) =>
          Message.info({
            content: `You select ${value}.`,
            showIcon: true,
          })
        }
      >
        {options.map((option, index) => (
          <Select.Option key={option} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
      <Select
        addBefore="Select city"
        placeholder="Select city"
        style={{ width: 300 }}
        mode="multiple"
      >
        {options.map((option, index) => (
          <Select.Option key={option} disabled={index === 4} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
}
