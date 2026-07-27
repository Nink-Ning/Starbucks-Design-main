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
    <Space size="large">
      <Cascader
        addBefore="Select city"
        placeholder="Please select ..."
        style={{ width: 300, marginBottom: 20 }}
        options={options}
      />
      <Cascader
        placeholder="Hover to expand"
        expandTrigger="hover"
        addBefore="Select city"
        style={{ width: 300, marginBottom: 20 }}
        options={options}
        mode="multiple"
      />
    </Space>
  );
}
