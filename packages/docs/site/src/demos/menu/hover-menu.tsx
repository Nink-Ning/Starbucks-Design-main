import { Menu } from '@sbux/starbucks-design-react';
import {
  IconApps,
  IconRobot,
  IconBulb,
  IconSafe,
  IconFire,
} from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <div className="menu-demo-round" style={{ height: 600 }}>
      <Menu style={{ width: 200 }} mode="pop" hasCollapseButton>
        <Menu.Item key="0">
          <IconApps />
          Navigation 1
        </Menu.Item>
        <Menu.SubMenu
          key="1"
          title={
            <>
              <IconRobot />
              Navigation 2
            </>
          }
        >
          <Menu.Item key="1_0">Beijing</Menu.Item>
          <Menu.Item key="1_1">Shanghai</Menu.Item>
          <Menu.Item key="1_2">Guangzhou</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="2"
          title={
            <>
              <IconBulb />
              Navigation 3
            </>
          }
        >
          <Menu.Item key="2_0">Wuhan</Menu.Item>
          <Menu.Item key="2_1">Chengdu</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="3">
          <IconSafe />
          Navigation 4
        </Menu.Item>
        <Menu.Item key="4">
          <IconFire />
          Navigation 5
        </Menu.Item>
      </Menu>
    </div>
  );
}
