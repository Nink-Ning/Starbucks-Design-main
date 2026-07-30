import React from 'react';
import { Layout, Menu, Message, Breadcrumb, Button } from '@sbux/starbucks-design-react';
import { IconCaretRight, IconCaretLeft, IconHome, IconCalendar } from '@sbux/starbucks-design-react/icon';

export default class Demo extends React.Component {
  state = {
    collapsed: false,
  };
  handleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout className="sb-layout-demo sb-layout-demo--shell">
        <Layout.Sider collapsed={this.state.collapsed} collapsible trigger={null} breakpoint="xl">
          <div className="sb-layout-demo__logo" />
          <Menu
            defaultOpenKeys={['1']}
            defaultSelectedKeys={['0_3']}
            onClickMenuItem={(key) =>
              Message.info({
                content: `You select ${key}`,
                showIcon: true,
              })
            }
            style={{ width: '100%' }}
          >
            <Menu.Item key="0_1" disabled>
              <IconHome />
              Menu 1
            </Menu.Item>
            <Menu.Item key="0_2">
              <IconCalendar />
              Menu 2
            </Menu.Item>
            <Menu.Item key="0_3">
              <IconCalendar />
              Menu 3
            </Menu.Item>
            <Menu.SubMenu
              key="1"
              title={
                <span>
                  <IconCalendar />
                  Navigation 1
                </span>
              }
            >
              <Menu.Item key="1_1">Menu 1</Menu.Item>
              <Menu.Item key="1_2">Menu 2</Menu.Item>
              <Menu.SubMenu key="2" title="Navigation 2">
                <Menu.Item key="2_1">Menu 1</Menu.Item>
                <Menu.Item key="2_2">Menu 2</Menu.Item>
              </Menu.SubMenu>
              <Menu.SubMenu key="3" title="Navigation 3">
                <Menu.Item key="3_1">Menu 1</Menu.Item>
                <Menu.Item key="3_2">Menu 2</Menu.Item>
                <Menu.Item key="3_3">Menu 3</Menu.Item>
              </Menu.SubMenu>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="4"
              title={
                <span>
                  <IconCalendar />
                  Navigation 4
                </span>
              }
            >
              <Menu.Item key="4_1">Menu 1</Menu.Item>
              <Menu.Item key="4_2">Menu 2</Menu.Item>
              <Menu.Item key="4_3">Menu 3</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Layout.Sider>
        <Layout>
          <Layout.Header>
            <Button shape="round" className="sb-layout-demo__trigger" onClick={this.handleCollapsed}>
              {this.state.collapsed ? <IconCaretRight /> : <IconCaretLeft />}
            </Button>
          </Layout.Header>
          <Layout className="sb-layout-demo__workspace">
            <Breadcrumb className="sb-layout-demo__breadcrumb">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Layout.Content>Content</Layout.Content>
            <Layout.Footer>Footer</Layout.Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
