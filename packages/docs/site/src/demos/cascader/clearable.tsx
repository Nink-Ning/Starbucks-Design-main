import { Cascader } from '@sbux/starbucks-design-react';

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
    <Cascader
      placeholder="Please select ..."
      style={{ width: 300 }}
      options={options}
      onChange={(value, option) => {
        console.log(value, option);
      }}
      defaultValue={['shanghai', 'shanghaishi', 'huangpu']}
      allowClear
    />
  );
}
