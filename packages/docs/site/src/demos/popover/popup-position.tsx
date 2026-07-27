import { Button, Popover } from '@sbux/starbucks-design-react';

export default function Demo() {
  const style = {
    margin: 0,
  };

  function getStyle(top, left) {
    return {
      position: 'absolute',
      width: 80,
      top,
      left,
    };
  }

  const content = (
    <span>
      <p style={style}>Here is the text content</p>
      <p style={style}>Here is the text content</p>
    </span>
  );

  return (
    <div
      style={{
        position: 'relative',
        width: 440,
        height: 280,
      }}
    >
      <Popover position="tl" title="Title" content={content}>
        <Button style={getStyle(0, 70)}>TL</Button>
      </Popover>
      <Popover position="top" title="Title" content={content}>
        <Button style={getStyle(0, 180)}>Top</Button>
      </Popover>
      <Popover position="tr" title="Title" content={content}>
        <Button style={getStyle(0, 290)}>TR</Button>
      </Popover>
      <Popover position="lt" title="Title" content={content}>
        <Button style={getStyle(60, 10)}>LT</Button>
      </Popover>
      <Popover position="left" title="Title" content={content}>
        <Button style={getStyle(120, 10)}>Left</Button>
      </Popover>
      <Popover position="lb" title="Title" content={content}>
        <Button style={getStyle(180, 10)}>LB</Button>
      </Popover>
      <Popover position="rt" title="Title" content={content}>
        <Button style={getStyle(60, 350)}>RT</Button>
      </Popover>
      <Popover position="right" title="Title" content={content}>
        <Button style={getStyle(120, 350)}>Right</Button>
      </Popover>
      <Popover position="rb" title="Title" content={content}>
        <Button style={getStyle(180, 350)}>RB</Button>
      </Popover>
      <Popover position="bl" title="Title" content={content}>
        <Button style={getStyle(240, 70)}>BL</Button>
      </Popover>
      <Popover position="bottom" title="Title" content={content}>
        <Button style={getStyle(240, 180)}>Bottom</Button>
      </Popover>
      <Popover position="br" title="Title" content={content}>
        <Button style={getStyle(240, 290)}>BR</Button>
      </Popover>
    </div>
  );
}
