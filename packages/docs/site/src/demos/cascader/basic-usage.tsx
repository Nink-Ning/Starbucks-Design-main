import { Cascader, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const options = [
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'Beijing',
          label: 'Beijing',
          children: [
            {
              value: 'chaoyang',
              label: 'Chaoyang',
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'shanghaishi',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu',
            },
          ],
        },
      ],
    },
  ];

  return (
    <div>
      <Space size="large">
        <Cascader
          placeholder="Please select ..."
          style={{ width: 300, marginBottom: 20 }}
          options={options}
        />
        <Cascader
          placeholder="Hover to expand"
          expandTrigger="hover"
          style={{ width: 300, marginBottom: 20 }}
          options={options}
        />
      </Space>
      <br/>
      <Space size="large">
        <Cascader
          status="error"
          allowClear
          placeholder="Please select ..."
          style={{ width: 300, marginBottom: 20 }}
          options={options}
        />
        <Cascader
          status="warning"
          allowClear
          placeholder="Hover to expand"
          expandTrigger="hover"
          style={{ width: 300, marginBottom: 20 }}
          options={options}
        />
      </Space>
    </div>
  );
}
