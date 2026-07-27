import React from 'react';
import { Button, Image } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Click me to preview image
      </Button>
      <Image.Preview
        src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
        visible={visible}
        onVisibleChange={setVisible}
      />
    </div>
  );
}
