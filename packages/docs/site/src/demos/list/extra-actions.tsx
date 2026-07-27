import { useState } from 'react';
import { List, Avatar } from '@sbux/starbucks-design-react';
import { IconLoading, IconDown, IconEdit, IconDelete } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const dataSource = new Array(4).fill({
    title: 'Beijing Bytedance Technology Co., Ltd.',
    description: 'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.',
  });
  const [loading, setLoading] = useState(false);

  const render = (actions, item, index) => (
    <List.Item key={index} actions={actions}>
      <List.Item.Meta
        avatar={<Avatar shape="square">A</Avatar>}
        title={item.title}
        description={item.description}
      />
    </List.Item>
  );

  const footer = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
      onClick={() => setLoading(!loading)}
      onKeyDown={e => {
        const keyCode = e.keyCode || e.which;
        if (keyCode === 13) { // enter
          setLoading(!loading)
        }
      }}
    >
      {loading ? (
        <span style={{ color: 'var(--color-text-3)' }}>
          <IconLoading style={{ marginRight: 8, color: 'rgb(var(--arcoblue-6))' }} />
          loading...
        </span>
      ) : (
        <span className="list-demo-actions-button" tabIndex={0} >
          More
          <IconDown style={{ marginLeft: 8 }} />
        </span>
      )}
    </div>
  );
  return (
    <>
      <List
        className="list-demo-actions"
        style={{ width: 700, marginBottom: 48 }}
        dataSource={dataSource}
        render={render.bind(null, [
          <span className="list-demo-actions-icon">
            <IconEdit />
          </span>,
          <span className="list-demo-actions-icon">
            <IconDelete />
          </span>,
        ])}
        footer={footer}
      />
      <List
        className="list-demo-actions"
        style={{ width: 700 }}
        dataSource={dataSource}
        render={render.bind(null, [
          <span className="list-demo-actions-button">Edit</span>,
          <span className="list-demo-actions-button">Delete</span>,
        ])}
      />
    </>
  );
}
