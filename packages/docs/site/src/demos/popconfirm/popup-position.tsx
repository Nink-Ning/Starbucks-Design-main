import { Button, Message, Popconfirm } from '@sbux/starbucks-design-react';

export default function Demo() {
  const props = {
    title: 'Are you sure you want to delete? ',
    onOk: () => {
      Message.info({
        content: 'ok'
      });
    },
    onCancel: () => {
      Message.error({
        content: 'cancel'
      });
    }
  };
  return (
    <div
      style={{
        position: 'relative',
        width: 400,
        height: 300
      }}
    >
      <Popconfirm focusLock position="tl" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 20,
            left: 70
          }}
        >
          TL
        </Button>
      </Popconfirm>
      <Popconfirm position="top" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 20,
            left: 180
          }}
        >
          Top
        </Button>
      </Popconfirm>
      <Popconfirm position="tr" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 20,
            left: 290
          }}
        >
          TR
        </Button>
      </Popconfirm>
      <Popconfirm position="lt" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 60,
            left: 10
          }}
        >
          LT
        </Button>
      </Popconfirm>
      <Popconfirm position="left" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 120,
            left: 10
          }}
        >
          Left
        </Button>
      </Popconfirm>
      <Popconfirm position="lb" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 180,
            left: 10
          }}
        >
          LB
        </Button>
      </Popconfirm>
      <Popconfirm position="rt" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 60,
            left: 350
          }}
        >
          RT
        </Button>
      </Popconfirm>
      <Popconfirm position="right" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 120,
            left: 350
          }}
        >
          Right
        </Button>
      </Popconfirm>
      <Popconfirm position="rb" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 180,
            left: 350
          }}
        >
          RB
        </Button>
      </Popconfirm>
      <Popconfirm position="bl" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 226,
            left: 70
          }}
        >
          BL
        </Button>
      </Popconfirm>
      <Popconfirm position="bottom" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 226,
            left: 180
          }}
        >
          Bottom
        </Button>
      </Popconfirm>
      <Popconfirm position="br" {...props}>
        <Button
          style={{
            position: 'absolute',
            width: 80,
            top: 226,
            left: 290
          }}
        >
          BR
        </Button>
      </Popconfirm>
    </div>
  );
}
