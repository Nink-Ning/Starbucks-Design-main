import { Affix, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Affix offsetBottom={120}>
      <Button type="primary">120px to affix bottom</Button>
    </Affix>
  );
}
