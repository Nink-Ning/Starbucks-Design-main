import React from 'react';
import { Popconfirm, Button, Message } from '@sbux/starbucks-design-react';

export default class Demo extends React.Component {
  render() {
    const props = {
      getPopupContainer: () => document.querySelector('.popup-container'),
      title: '确认编辑该选项吗？',
      onOk: () => {
        Message.info({
          content: '你点击了确认',
        });
      },
      onCancel: () => {
        Message.error({
          content: '你点击了取消',
        });
      },
    };

    return (
      <div
        className="popup-container"
        directions={['right', 'bottom']}
        style={{
          width: 300,
          height: 300,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            width: 450,
            height: 300,
            position: 'relative',
          }}
        >
          <Popconfirm position="bottom" {...props} getPopupContainer={(node) => node.parentElement}>
            <Button style={{ margin: '0 200px' }}>popover</Button>
          </Popconfirm>
        </div>
      </div>
    );
  }
}
