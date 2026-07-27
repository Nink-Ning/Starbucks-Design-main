import { Breadcrumb, Menu } from '@sbux/starbucks-design-react';

export default function Demo() {
  const menu = (
    <Menu>
      <Menu.Item>Data</Menu.Item>
      <Menu.Item>Users</Menu.Item>
      <Menu.Item>Permission</Menu.Item>
    </Menu>
  );
  const routes = [
    {
      path: '/',
      breadcrumbName: 'Home',
    },
    {
      path: '/Channel',
      breadcrumbName: 'Channel',
      children: [
        {
          path: '/users',
          breadcrumbName: 'Users',
        },
        {
          path: '/permission',
          breadcrumbName: 'Permission',
        },
      ],
    },
    {
      path: '/news',
      breadcrumbName: 'News',
    },
  ];

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item droplist={menu}>Channel</Breadcrumb.Item>
        <Breadcrumb.Item>News</Breadcrumb.Item>
      </Breadcrumb>
      <br />
      <Breadcrumb style={{ marginTop: 20 }} routes={routes} />
    </div>
  );
}
