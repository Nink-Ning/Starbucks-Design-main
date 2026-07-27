import { Button, Dropdown, Menu, Space } from '@sbux/starbucks-design-react';
import { IconDown } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const dropList = (
    <Menu>
      <Menu.Item key="1">Beijing</Menu.Item>
      <Menu.Item key="2">Shanghai</Menu.Item>
      <Menu.Item key="3">Guangzhou</Menu.Item>
    </Menu>
  );

  return (
    <Space className="dropdown-demo">
      <Dropdown droplist={dropList} position="bl">
        <Button type="text">
          Hover me <IconDown />
        </Button>
      </Dropdown>

      <Dropdown droplist={dropList} position="bl" disabled>
        <Button type="text">
          Hover me <IconDown />
        </Button>
      </Dropdown>
    </Space>
  );
}
