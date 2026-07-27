import { Checkbox } from '@sbux/starbucks-design-react';

export default function Demo() {
  const options = [
    {
      label: 'Option 1',
      value: '1',
    },
    {
      label: 'Option 2',
      value: '2',
      disabled: true,
    },
    {
      label: 'Option 3',
      value: '3',
    },
    {
      label: 'Option 4',
      value: '4',
    },
  ];

  return (
    <div>
      <Checkbox.Group
        options={['Option A', 'Option B', 'Option C']}
        style={{ display: 'block', marginBottom: 16 }}
      />

      <Checkbox.Group
        options={options}
        defaultValue={['1', '3']}
        style={{ display: 'block', marginBottom: 20 }}
      />

      <Checkbox.Group direction="vertical" options={['Option A', 'Option B', 'Option C']} />
    </div>
  );
}
