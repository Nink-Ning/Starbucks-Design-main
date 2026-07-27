import { Radio } from '@sbux/starbucks-design-react';

export default function Demo() {
  const options = [
    {
      value: 'Beijing',
      label: 'Beijing',
    },
    {
      value: 'Shanghai',
      label: 'Shanghai',
    },
    {
      value: 'Guangzhou',
      label: 'Guangzhou',
      disabled: true,
    },
    {
      value: 'Shenzhen',
      label: 'Shenzhen',
    },
  ];

  return (
    <div>
      <Radio.Group
        options={options}
        size="mini"
        type="button"
        defaultValue="Beijing"
        style={{ marginBottom: 20 }}
      />
      <br />
      <Radio.Group
        options={options}
        size="small"
        type="button"
        defaultValue="Beijing"
        style={{ marginBottom: 20 }}
      />
      <br />
      <Radio.Group
        options={options}
        size="default"
        type="button"
        defaultValue="Beijing"
        style={{ marginBottom: 20 }}
      />
      <br />
      <Radio.Group
        options={options}
        size="large"
        type="button"
        defaultValue="Beijing"
        style={{ marginBottom: 20 }}
      />
    </div>
  );
}
