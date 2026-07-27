import { Message, Select, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Wuhan'];
  return (
    <Space size="large">
      <Select
        placeholder="Select city"
        bordered={false}
        style={{ width: 154 }}
        onChange={(value) =>
          Message.info({
            content: `You select ${value}.`,
            showIcon: true,
          })
        }
      >
        {options.map((option, index) => (
          <Select.Option key={option} disabled={index === 3} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
      <Select
        placeholder="Select city"
        bordered={false}
        style={{ width: 154 }}
        defaultValue="Beijing"
        disabled
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
