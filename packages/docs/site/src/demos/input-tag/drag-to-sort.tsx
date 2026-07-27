import { InputTag } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <InputTag style={{ maxWidth: 350 }} allowClear dragToSort defaultValue={['a', 'b', 'c', 'd']} />
  );
}
