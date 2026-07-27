import { Affix, Button, Message } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Affix
      offsetBottom={80}
      onChange={(fixed) => {
        Message.info({
          content: `${fixed}`,
          showIcon: true,
        });
      }}
    >
      <Button type="primary">80px to affix bottom</Button>
    </Affix>
  );
}
