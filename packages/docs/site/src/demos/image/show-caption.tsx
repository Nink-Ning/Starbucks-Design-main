import { Image, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const src =
    '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp';
  const title = 'A user’s avatar';
  const description = 'Present by Arco Design';
  return (
    <Space size={60} align="start">
      <Image width={200} src={src} title={title} description={description} alt="lamp" />
      <Image
        width={200}
        src={src}
        title={title}
        description={description}
        footerPosition="outer"
        alt="lamp"
      />
    </Space>
  );
}
