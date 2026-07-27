import { Button, Popover, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const style = {
    margin: 0,
  };

  return (
    <Space size={40}>
      <Popover
        trigger="hover"
        title="Title"
        content={
          <span>
            <p style={style}>Here is the text content</p>
            <p style={style}>Here is the text content</p>
          </span>
        }
      >
        <Button>Hover</Button>
      </Popover>
      <Popover
        trigger="click"
        title="Title"
        content={
          <span>
            <p style={style}>Here is the text content</p>
            <p style={style}>Here is the text content</p>
          </span>
        }
      >
        <Button>Click</Button>
      </Popover>
      <Popover
        trigger="focus"
        title="Title"
        content={
          <span>
            <p style={style}>Here is the text content</p>
            <p style={style}>Here is the text content</p>
          </span>
        }
      >
        <Button>Focus</Button>
      </Popover>
    </Space>
  );
}
