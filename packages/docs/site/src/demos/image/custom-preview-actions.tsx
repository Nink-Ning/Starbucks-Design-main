import { Image, Tooltip } from '@sbux/starbucks-design-react';
import { IconDownload, IconInfoCircle } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Image
      width={200}
      src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"
      previewProps={{
        actions: [
          {
            key: 'download',
            content: <IconDownload />,
            name: 'Download',
          },
          {
            key: 'info',
            content: <IconInfoCircle />,
            name: 'Info',
            getContainer: (action) => {
              return <Tooltip content="A user’s avatar">{action}</Tooltip>;
            },
          },
        ],
        actionsLayout: ['info', 'rotateRight', 'zoomIn', 'zoomOut', 'extra'],
      }}
      alt="lamp"
    />
  );
}
