import React from 'react';
import { Layout, Menu, Message, Breadcrumb } from '@sbux/starbucks-design-react';
import { IconHome, IconCalendar } from '@sbux/starbucks-design-react/icon';

export default class Demo extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed, type) => {
    const content = type === 'responsive' ? '触发响应式收缩' : '点击触发收缩';
    Message.info({
      content,
      duration: 2000,
    });
    this.setState({
      collapsed,
    });
  };

  render() {
    function BaseMenu(props) {
      return (
        <Menu defaultOpenKeys={['1']} defaultSelectedKeys={['0_2']} {...props}>
          <Menu.Item key="0_1" disabled>
            <IconHome />
            Menu 1
          </Menu.Item>
          <Menu.Item key="0_2">
            <IconCalendar />
            Menu 2
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
      );
    }
    return (
      <Layout className="sb-layout-demo sb-layout-demo--shell">
        <Layout.Sider
          theme="dark"
          breakpoint="lg"
          onCollapse={this.onCollapse}
          collapsed={this.state.collapsed}
          width={220}
          collapsible
        >
          <div className="sb-layout-demo__logo" />
          <BaseMenu
            onClickMenuItem={(key) =>
              Message.info({
                content: `You select ${key}`,
                showIcon: true,
              })
            }
            theme="dark"
            style={{ width: '100%' }}
          />
        </Layout.Sider>
        <Layout>
          <Layout.Header>
            <BaseMenu mode="horizontal" />
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
