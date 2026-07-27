import { Button, Popover } from '@sbux/starbucks-design-react';

export default function Demo() {
  const style = {
    margin: 0,
  };

  return (
    <Popover
      title="Title"
      content={
        <span>
          <p style={style}>Here is the text content</p>
          <p style={style}>Here is the text content</p>
        </span>
      }
    >
      <Button type="primary">Hover</Button>
    </Popover>
  );
}
