import { Menu } from '@sbux/starbucks-design-react';
import { IconApps, IconBug, IconBulb } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <div className="menu-demo" style={{ height: 600 }}>
      <Menu
        style={{ width: 200, height: '100%' }}
        hasCollapseButton
        defaultOpenKeys={['0']}
        defaultSelectedKeys={['0_1']}
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
          <Menu.Item key="0_2" disabled>
            Menu 3
          </Menu.Item>
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
          <Menu.ItemGroup key="2_0" title="Menu Group 1">
            <Menu.Item key="2_0_0">Menu 1</Menu.Item>
            <Menu.Item key="2_0_1">Menu 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="2_1" title="Menu Group 1">
            <Menu.Item key="2_1_0">Menu 3</Menu.Item>
            <Menu.Item key="2_1_1">Menu 4</Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
}
