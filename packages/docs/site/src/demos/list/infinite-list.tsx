import { List, Avatar } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <>
      <h3 style={{ color: 'var(--color-text-2)' }}>10000 items</h3>
      <List
        style={{ width: 600 }}
        virtualListProps={{
          height: 560,
        }}
        dataSource={new Array(10000).fill(null).map((_, index) => {
          const prefix = `0000${index}`.slice(-5);
          return {
            title: 'Beijing Bytedance Technology Co., Ltd.',
            description: `(${prefix}) Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.`,
          };
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
    </>
  );
}
