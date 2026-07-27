import { Button, Icon, Message, Space } from '@sbux/starbucks-design-react';
import { IconFaceSmileFill } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const IconFont = Icon.addFromIconFontCn({
    src: '//at.alicdn.com/t/font_180975_26f1p759rvn.js'
  })
  return (
    <Space size="large">
      <Button
        onClick={() =>
          Message.info({
            icon: <IconFont type="icon-info" />,
            content: 'This is an info message!'
          })
        }
        type="primary"
      >
        Info (Light)
      </Button>
      <Button
        onClick={() =>
          Message.success({
            icon: <IconFont type="icon-success" />,
            content: 'This is a primary message!'
          })
        }
        type="primary"
        status="success"
      >
        Success (Light)
      </Button>
      <Button
        onClick={() =>
          Message.warning({
            icon: <IconFont type="icon-warning" />,
            content: 'This is a warning message!'
          })
        }
        type="primary"
        status="warning"
      >
        Warning (Light)
      </Button>
      <Button
        onClick={() =>
          Message.error({
            icon: <IconFont type="icon-error" />,
            content: 'This is an error message!'
          })
        }
        type="primary"
        status="danger"
      >
        Error (Light)
      </Button>
      <Button
        onClick={() =>
          Message.info({
            icon: <IconFaceSmileFill />,
            content: 'This is a message!'
          })
        }
        type="secondary"
      >
        Smile
      </Button>
    </Space>
  );
}
