import { InputTag } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <InputTag
      allowClear
      labelInValue
      defaultValue={[
        {
          label: 'a',
          value: '1',
        },
      ]}
      placeholder="Please input"
      style={{ maxWidth: 350 }}
      onChange={(v) => {
        console.log(v);
      }}
    />
  );
}
