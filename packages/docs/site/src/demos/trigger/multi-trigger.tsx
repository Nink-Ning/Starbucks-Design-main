import { Space, Trigger, Skeleton, Typography, Button, Input } from '@sbux/starbucks-design-react';

export default function Demo() {
  function Popup() {
    return (
      <div className="demo-trigger-popup" style={{ width: 300 }}>
        <Skeleton />
      </div>
    );
  }

  return (
    <Space size={40}>
      <Trigger
        popup={() => <Popup />}
        trigger={['click', 'hover']}
        clickToClose={false}
        classNames="zoomInTop"
      >
        <Button>Click/Hover Me</Button>
      </Trigger>
      <Trigger
        popup={() => (
          <Typography.Paragraph className="demo-trigger-popup">
            This popup will be hidden when Input triggers the blur or click. If you don't want to
            hide it when blur, you can set blurToHide=false. If you don't want to hide when you
            click, you can set clickToClose=false.
          </Typography.Paragraph>
        )}
        trigger={['hover', 'click', 'focus']}
      >
        <Input style={{ width: 200 }} placeholder="Click/Hover/Focus Me" />
      </Trigger>
      <Trigger popup={() => <Popup />} trigger={['hover', 'focus']} blurToHide={false}>
        <Input style={{ width: 200 }} placeholder="Hover/Focus Me" />
      </Trigger>
    </Space>
  );
}
