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
        placeholder="Please select ..."
        style={{ width: 300, marginBottom: 20 }}
        options={options}
        showSearch
        changeOnSelect
        allowClear
      />
      <Cascader
        placeholder="Please select ..."
        style={{ width: 300, marginBottom: 20 }}
        options={options}
        mode="multiple"
        changeOnSelect
        allowClear
        showSearch
      />
    </Space>
  );
}
