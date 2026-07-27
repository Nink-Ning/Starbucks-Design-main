import { useState } from 'react';
import { Layout, Menu } from '@sbux/starbucks-design-react';
import { IconHome, IconCalendar } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const collapsedWidth = 60;
  const normalWidth = 220;
  const [collapsed, setCollapsed] = useState(false);
  const [siderWidth, setSiderWidth] = useState(normalWidth);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
    setSiderWidth(collapsed ? collapsedWidth : normalWidth);
  };

  const handleMoving = (_, { width }) => {
    if (width > collapsedWidth) {
      setSiderWidth(width);
      setCollapsed(!(width > collapsedWidth + 20));
    } else {
      setSiderWidth(collapsedWidth);
      setCollapsed(true);
    }
  };

  return (
    <Layout className="byte-layout-collapse-demo">
      <Layout.Sider
        collapsible
        theme="dark"
        onCollapse={onCollapse}
        collapsed={collapsed}
        width={siderWidth}
        resizeBoxProps={{
          directions: ['right'],
          onMoving: handleMoving,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" autoOpen style={{ width: '100%' }}>
          <Menu.Item key="1" disabled>
            <IconHome />
            设计指南
          </Menu.Item>
          <Menu.Item key="2">
            <IconCalendar />
            区块
          </Menu.Item>
          <Menu.Item key="3">
            <IconCalendar />
            模块
          </Menu.Item>
          <Menu.SubMenu
            key="layout"
            title={
              <span>
                <IconCalendar /> 布局组件
              </span>
            }
          >
            <Menu.Item key="11">栅格</Menu.Item>
            <Menu.Item key="12">分隔符</Menu.Item>
            <Menu.Item key="13">布局</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Layout.Sider>
      <Layout.Content style={{ background: 'rgb(240,255,255)', textAlign: 'center', padding: '30px' }}>
        <div style={{ width: '100%', height: '100%' }}>Content</div>
      </Layout.Content>
    </Layout>
  );
}
