import React from 'react';
import { Image, Button, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [timestamp, setTimestamp] = React.useState('');
  return (
    <div>
      <div>
        <Button
          type="primary"
          onClick={() => {
            setTimestamp(Date.now());
          }}
          style={{ marginBottom: 20 }}
        >
          reload
        </Button>
      </div>
      <Space size={20}>
        <Image
          width={200}
          height={200}
          src={`//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp?timestamp=${timestamp}`}
          loader={true}
          alt="lamp1"
        />
        <Image
          width={200}
          height={200}
          src={`//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp?timestamp=${timestamp}`}
          loaderClassName="image-demo-loader-animate"
          alt="lamp2"
          style={{ marginLeft: 67 }}
        />
      </Space>
    </div>
  );
}
