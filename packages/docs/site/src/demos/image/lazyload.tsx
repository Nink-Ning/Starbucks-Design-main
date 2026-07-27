import React from 'react';
import { Image, Space, Skeleton } from '@sbux/starbucks-design-react';

export default function Demo() {
  const imageSize = { width: 380, height: 150 };
  const srcList = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/volcengine-solutions-medical.png~tplv-uwbnlip3yd-png.png',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/volcengine-solutions-automotive.png~tplv-uwbnlip3yd-png.png',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/volcengine-solutions-tourism.png~tplv-uwbnlip3yd-png.png',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/volcengine-solutions-finance.png~tplv-uwbnlip3yd-png.png',
  ];

  return (
    <Space direction="vertical" size={50} className="image-demo-wrapper">
      {srcList.map((src, key) => (
        <Image
          key={key}
          {...imageSize}
          src={src}
          alt="lamp"
          lazyload={{ threshold: 0.5 }}
          loader={<Skeleton image={{ style: imageSize }} text={false} animation />}
        />
      ))}
    </Space>
  );
}
