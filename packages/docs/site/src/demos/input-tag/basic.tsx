import { InputTag } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <InputTag
      defaultValue={['test']}
      style={{ width: 320 }}
      placeholder="Please Enter"
      allowClear
    />
  );
}
