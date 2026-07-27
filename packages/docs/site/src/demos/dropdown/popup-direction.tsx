import { Button, Dropdown, Menu, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  const positions = ['bl', 'bottom', 'br', 'tl', 'top', 'tr'];
  const descriptions = ['BottomLeft', 'BottomCenter', 'BottomRight', 'TopLeft', 'Top', 'TopRight'];

  return (
    <Space size="large" className="dropdown-demo">
      {positions.map((position, index) => (
        <Dropdown
          key={index}
          position={position}
          droplist={
            <Menu>
              <Menu.Item key="1">Menu Item 1</Menu.Item>
              <Menu.Item key="2">Menu Item 2</Menu.Item>
              <Menu.Item key="3">Menu Item 3</Menu.Item>
            </Menu>
          }
        >
          <Button type="secondary">{descriptions[index]}</Button>
        </Dropdown>
      ))}
    </Space>
  );
}
