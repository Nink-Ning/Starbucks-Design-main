import { useState } from 'react';
import { Carousel, Radio } from '@sbux/starbucks-design-react';

export default function Demo() {
  const imageSrc = [
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp',
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/24e0dd27418d2291b65db1b21aa62254.png~tplv-uwbnlip3yd-webp.webp'
  ]

  const [indicatorType, setIndicatorType] = useState('dot')
  const [indicatorPosition, setIndicatorPosition] = useState('bottom')
  return (
    <>
      <Radio.Group
        type="button"
        name="type"
        value={indicatorType}
        onChange={(value) => {
          setIndicatorType(value)
        }}
        style={{ marginBottom: 10 }}
      >
        <Radio value="dot">dot</Radio>
        <Radio value="line">line</Radio>
        <Radio value="slider">slider</Radio>
      </Radio.Group>
      <br />
      <Radio.Group
        type="button"
        name="position"
        value={indicatorPosition}
        onChange={(value) => {
          setIndicatorPosition(value)
        }}
        style={{
          marginBottom: 20
        }}
      >
        <Radio value="left">left</Radio>
        <Radio value="right">right</Radio>
        <Radio value="top">top</Radio>
        <Radio value="bottom">bottom</Radio>
        <Radio value="outer">outer</Radio>
      </Radio.Group>
      <Carousel
        indicatorType={indicatorType}
        indicatorPosition={indicatorPosition}
        showArrow="never"
        style={{ width: 600, height: 240 }}
      >
        {imageSrc.map((src, index) => (
          <div key={index}>
            <img src={src} style={{ width: '100%' }} />
          </div>
        ))}
      </Carousel>
    </>
  );
}
