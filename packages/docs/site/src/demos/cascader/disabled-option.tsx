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
            {
              value: 'dongcheng',
              label: 'Dongcheng',
              disabled: true,
              children: [
                {
                  value: 'chaoyangmen',
                  label: 'Chaoyangmen',
                },
                {
                  value: 'jianguo',
                  label: 'Jianguomen',
                },
              ],
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
    <Space size="large" align="start">
      <Cascader
        allowClear
        style={{ width: 300, marginBottom: 20 }}
        options={options}
        defaultValue={['beijing', 'Beijing', 'dongcheng', 'chaoyangmen']}
        placeholder="Please select ..."
        showSearch
      />
      <Cascader
        allowClear
        style={{ width: 300, marginBottom: 20 }}
        options={options}
        defaultValue={[
          ['beijing', 'Beijing', 'dongcheng', 'chaoyangmen'],
          ['beijing', 'Beijing', 'dongcheng', 'jianguo'],
        ]}
        placeholder="Please select ..."
        mode="multiple"
        showSearch
      />
    </Space>
  );
}
