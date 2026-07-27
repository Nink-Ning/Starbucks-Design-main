import { Button, Dropdown, Menu, Message } from '@sbux/starbucks-design-react';
import { IconDown } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const dropList = (
    <Menu onClickMenuItem={(key) => Message.info(`You clicked ${key}`)}>
      <Menu.Item key="Beijing">Beijing</Menu.Item>
      <Menu.Item key="Shanghai">Shanghai</Menu.Item>
      <Menu.Item key="Guangzhou">Guangzhou</Menu.Item>
    </Menu>
  );

  return (
    <div className="dropdown-demo">
      <Dropdown droplist={dropList} position="bl" triggerProps={{ autoAlignPopupWidth: true }}>
        <Button type="text">
          Hover me and click an item <IconDown />
        </Button>
      </Dropdown>
    </div>
  );
}
