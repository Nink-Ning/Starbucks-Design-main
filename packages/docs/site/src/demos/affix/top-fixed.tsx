import { Affix, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Affix offsetTop={80}>
      <Button type="primary">80px to affix top</Button>
    </Affix>
  );
}
