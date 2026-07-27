import { useState } from 'react';
import { Slider, Menu } from '@sbux/starbucks-design-react';
import { IconApps, IconBug, IconBulb } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const [width, setWidth] = useState(240);
  return (
    <div className="menu-demo" style={{ height: 600 }}>
      <Slider
        style={{ width: 320, marginBottom: 24 }}
        value={width}
        onChange={(value) => setWidth(value)}
        step={10}
        min={160}
        max={400}
      />
      <Menu
        style={{ width: width, height: 'calc(100% - 28px)' }}
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
          <Menu.Item key="2_0">Menu 1</Menu.Item>
          <Menu.Item key="2_1">Menu 2</Menu.Item>
          <Menu.Item key="2_2">Menu 3</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
}
