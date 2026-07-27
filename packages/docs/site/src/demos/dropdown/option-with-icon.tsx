import { Button, Dropdown, Menu } from '@sbux/starbucks-design-react';
import { IconDown, IconLocation } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const iconStyle = {
    marginRight: 8,
    fontSize: 16,
    transform: 'translateY(1px)',
  };
  const dropList = (
    <Menu>
      <Menu.Item key="1">
        <IconLocation style={iconStyle} />
        Beijing
      </Menu.Item>
      <Menu.Item key="2">
        <IconLocation style={iconStyle} />
        Shanghai
      </Menu.Item>
      <Menu.Item key="3">
        <IconLocation style={iconStyle} />
        Guangzhou
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="dropdown-demo">
      <Dropdown droplist={dropList} trigger="click" position="bl">
        <Button type="text">
          Click me <IconDown />
        </Button>
      </Dropdown>
    </div>
  );
}
