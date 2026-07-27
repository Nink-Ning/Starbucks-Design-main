import { Menu } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div className="menu-demo">
      <Menu mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item
          key="0"
          style={{ padding: 0, marginRight: 38, }}
          disabled
        >
          <div
            style={{
              width: 80,
              height: 30,
              borderRadius: 2,
              background: 'var(--color-fill-3)',
              cursor: 'text',
            }}
          />
        </Menu.Item>
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Solution</Menu.Item>
        <Menu.Item key="3">Cloud Service</Menu.Item>
        <Menu.Item key="4">Cooperation</Menu.Item>
      </Menu>
    </div>
  );
}
