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
              disableCheckbox: true,
              children: [
                {
                  value: 'datunli',
                  label: 'Datunli',
                },
              ],
            },
            {
              value: 'dongcheng',
              label: 'Dongcheng',
            },
            {
              value: 'xicheng',
              label: 'Xicheng',
            },
            {
              value: 'haidian',
              label: 'Haidian',
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
    <Space>
      <Cascader
        placeholder="Please select ..."
        style={{
          width: 300,
        }}
        options={options}
        mode="multiple"
        defaultValue={[['beijing', 'Beijing', 'chaoyang', 'datunli']]}
      />
      <Cascader
        placeholder="Please select ..."
        style={{ width: 300 }}
        options={options}
        mode="multiple"
        checkedStrategy="parent"
      />
    </Space>
  );
}
