import { Mentions } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Mentions
      style={{ width: 154 }}
      defaultValue="@Nink"
      options={['Nink', 'Zero', 'Kevin']}
    />
  );
}
