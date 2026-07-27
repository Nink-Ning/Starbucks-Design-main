import React from 'react';
import { Image, Tooltip } from '@sbux/starbucks-design-react';
import { IconEye, IconDownload, IconInfoCircle } from '@sbux/starbucks-design-react/icon';

export default function Demo(props = {}) {
  const [visible, setVisible] = React.useState(false);
  return (
    <Image
      src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      title="A user’s avatar"
      description="Present by Arco Design"
      actions={[
        <button
          key="1"
          className="image-demo-action-item"
          onClick={(e) => {
            setVisible(true);
          }}
        >
          <IconEye />
        </button>,
        <button
          key="2"
          className="image-demo-action-item"
          onClick={(e) => {
            console.log('download');
          }}
        >
          <IconDownload />
        </button>,
        <Tooltip key="3" content="A user’s avatar">
          <button className="image-demo-action-item">
            <IconInfoCircle />
          </button>
        </Tooltip>,
      ]}
      previewProps={{
        visible,
        onVisibleChange: (e) => {
          setVisible(false);
        },
      }}
      {...props}
    />
  );
}
