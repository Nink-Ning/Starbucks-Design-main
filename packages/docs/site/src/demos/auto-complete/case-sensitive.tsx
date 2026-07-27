import { AutoComplete } from '@sbux/starbucks-design-react';

export default function Demo() {
  const data = ['beijing', 'beihai', 'baoding'];

  return (
    <div>
      <AutoComplete
        placeholder="Input `B`"
        strict
        data={data}
        style={{ width: 154 }}
      />
    </div>
  );
}
