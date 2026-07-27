import { Breadcrumb, Link, Space } from '@sbux/starbucks-design-react';

const routes = [
  {
    path: '/',
    breadcrumbName: 'Home',
  },
  {
    path: '/channel',
    breadcrumbName: 'Channel',
  },
  {
    path: '/news',
    breadcrumbName: 'News',
  },
];

export default function Demo() {
  return (
    <Space size={40} direction="vertical">
      <Breadcrumb routes={routes} />
      <Breadcrumb
        routes={routes}
        itemRender={(route, _routes, paths) => (
          <Link href={`/${paths.join('/')}`}>{route.breadcrumbName}</Link>
        )}
      />
    </Space>
  );
}
