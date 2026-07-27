import { useState } from 'react';
import { Button, Menu } from '@sbux/starbucks-design-react';
import {
  IconMenuUnfold,
  IconMenuFold,
  IconApps,
  IconBug,
  IconBulb,
  IconBook,
} from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const [collapse, setCollapse] = useState(false);
  return (
    <div className="menu-demo">
      <Button
        style={{
          padding: '0 12px',
          height: 30,
          lineHeight: '30px',
          marginBottom: 4,
        }}
        type="primary"
        onClick={() => setCollapse(!collapse)}
      >
        {collapse ? <IconMenuUnfold /> : <IconMenuFold />}
      </Button>
      <Menu
        style={{ width: 200, borderRadius: 4 }}
        theme="dark"
        collapse={collapse}
        defaultOpenKeys={['0']}
        defaultSelectedKeys={['0_2']}
      >
        <Menu.SubMenu
          key="0"
          title={
            <>
              <IconApps /> Navigation 1
            </>
          }
        >
          <Menu.Item key="0_0">Menu 1</Menu.Item>
          <Menu.Item key="0_1">Menu 2</Menu.Item>
          <Menu.Item key="0_2">Menu 3</Menu.Item>
          <Menu.Item key="0_3">Menu 4</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="1"
          title={
            <>
              <IconBug /> Navigation 2
            </>
          }
        >
          <Menu.Item key="1_0">Menu 1</Menu.Item>
          <Menu.Item key="1_1">Menu 2</Menu.Item>
          <Menu.Item key="1_2">Menu 3</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="2"
          title={
            <>
              <IconBulb /> Navigation 3
            </>
          }
        >
          <Menu.Item key="2_0">Menu 1</Menu.Item>
          <Menu.Item key="2_1">Menu 2</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item renderItemInTooltip={() => 'NAVIGATION-4'}>
          <IconBook /> Navigation 4
        </Menu.Item>
      </Menu>
    </div>
  );
}
