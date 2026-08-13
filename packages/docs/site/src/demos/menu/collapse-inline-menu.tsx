import { useState } from 'react';
import { Menu } from '@sbux/starbucks-design-react';
import {
  IconApps,
  IconBug,
  IconBulb,
  IconHome,
  IconRobot,
} from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const [collapse, setCollapse] = useState(false);

  return (
    <div
      className="menu-demo"
      style={{
        boxSizing: 'border-box',
        width: '100%',
        height: 680,
        padding: 24,
        backgroundColor: 'var(--color-neutral-2)',
      }}
    >
      <Menu
        style={{
          width: 260,
          height: '100%',
          backgroundColor: 'var(--bg-color-container)',
          borderRight: '1px solid var(--color-border-1)',
        }}
        collapse={collapse}
        hasCollapseButton
        defaultOpenKeys={['domains', 'analytics', 'compute']}
        defaultSelectedKeys={['domains-overview']}
        onCollapseChange={setCollapse}
      >
        <Menu.Item key="account-home" renderItemInTooltip={() => 'Account home'}>
          <IconHome />
          <span>Account home</span>
        </Menu.Item>

        <Menu.SubMenu
          key="domains"
          title={
            <>
              <IconApps />
              <span>Domains</span>
            </>
          }
        >
          <Menu.Item key="domains-overview">Overview</Menu.Item>
          <Menu.Item key="domains-registrations">Registrations</Menu.Item>
          <Menu.Item key="domains-transfers">Transfers</Menu.Item>
        </Menu.SubMenu>

        <Menu.ItemGroup key="observe" title="Observe">
          <Menu.Item key="investigate" renderItemInTooltip={() => 'Investigate'}>
            <IconBug />
            <span>Investigate</span>
          </Menu.Item>
          <Menu.SubMenu
            key="analytics"
            title={
              <>
                <IconBulb />
                <span>Analytics</span>
              </>
            }
          >
            <Menu.Item key="analytics-dashboards">Dashboards</Menu.Item>
            <Menu.Item key="analytics-account">Account analytics</Menu.Item>
            <Menu.Item key="analytics-web">Web analytics</Menu.Item>
          </Menu.SubMenu>
        </Menu.ItemGroup>

        <Menu.ItemGroup key="build" title="Build">
          <Menu.SubMenu
            key="compute"
            title={
              <>
                <IconApps />
                <span>Compute</span>
              </>
            }
          >
            <Menu.Item key="compute-workers">Workers &amp; Pages</Menu.Item>
            <Menu.Item key="compute-observability">Observability</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="ai" renderItemInTooltip={() => 'AI'}>
            <IconRobot />
            <span>AI</span>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </div>
  );
}
