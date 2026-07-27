import { List, Avatar } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <List
      style={{ width: 600 }}
      dataSource={new Array(4).fill({
        title: 'Beijing Bytedance Technology Co., Ltd.',
        description: 'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.',
      })}
      render={(item, index) => (
        <List.Item key={index}>
          <List.Item.Meta
            avatar={<Avatar shape="square">A</Avatar>}
            title={item.title}
            description={item.description}
          />
        </List.Item>
      )}
    />
  );
}
