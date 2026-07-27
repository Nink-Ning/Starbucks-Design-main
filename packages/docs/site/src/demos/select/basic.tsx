import { Message, Select, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];
  return (
    <div>
    <Space size="large">
      <Select
        placeholder="Select city"
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
      <Select placeholder="Select city" style={{ width: 154 }} defaultValue="Beijing" disabled>
        {options.map((option, index) => (
          <Select.Option key={option} disabled={index === 4} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </Space>
    <br/>
    <br/>
    <Space size="large">
      <Select
        status="error"
        placeholder="Select city"
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
      <Select status="warning" placeholder="Select city" style={{ width: 154 }} defaultValue="Beijing" >
        {options.map((option, index) => (
          <Select.Option key={option} disabled={index === 4} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </Space>
    </div>
  );
}
