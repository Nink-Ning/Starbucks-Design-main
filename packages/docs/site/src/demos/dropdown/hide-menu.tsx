import { useState, useRef } from 'react';
import { Button, Dropdown, Menu, Space } from '@sbux/starbucks-design-react';
import { IconDown } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const [popupVisible, setPopupVisible] = useState(false);
  const refMenuItemClicked = useRef(null);

  return (
    <Space size="large">
      <Dropdown
        droplist={
          <Menu
            onClickMenuItem={(key) => {
              refMenuItemClicked.current = key;
            }}
          >
            <Menu.Item key="1">Won't close the menu</Menu.Item>
            <Menu.Item key="2">Will close the menu</Menu.Item>
          </Menu>
        }
        trigger="click"
        position="bl"
        popupVisible={popupVisible}
        onVisibleChange={(visible) => {
          if (refMenuItemClicked.current === null || refMenuItemClicked.current === '2') {
            setPopupVisible(visible);
          }

          refMenuItemClicked.current = null;
        }}
      >
        <Button type="text">
          Click
          <IconDown />
        </Button>
      </Dropdown>
      <Dropdown
        droplist={
          <Menu
            onClickMenuItem={(key) => {
              if (key === '1') {
                return false;
              }
            }}
          >
            <Menu.Item key="1">Return false in onClickMenuItem callback</Menu.Item>
            <Menu.Item key="2">Will close the menu</Menu.Item>
          </Menu>
        }
        trigger="click"
        position="bl"
      >
        <Button type="text">
          Click
          <IconDown />
        </Button>
      </Dropdown>
    </Space>
  );
}
