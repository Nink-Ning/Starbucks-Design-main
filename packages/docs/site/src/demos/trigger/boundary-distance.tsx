import { Trigger, Skeleton, Typography, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  function Popup() {
    return <Skeleton className="demo-trigger-popup" style={{ width: 600 }} />;
  }

  return (
    <div>
      <Typography>
        滚动当前 demo 到视口顶部距离大于 200px 的位置，点击 button ，弹出层将会在 button 上方出现。隐藏弹出层后再向上滚动页面，直到 button 距离视口小于 200px 的位置，再次点击 button。 弹出层将会出现在 button 下方。
      </Typography>
      <Trigger trigger="click" position="top" popup={() => <Popup />} boundaryDistance={{top: 200}}>
        <Button type="primary" style={{ marginTop: 80 }}>
          Button (boundaryDistance: `top: 200`)
        </Button>
      </Trigger>
    </div>
  );
}
