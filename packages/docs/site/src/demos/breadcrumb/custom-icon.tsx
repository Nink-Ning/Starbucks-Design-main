import { Breadcrumb, Space } from '@sbux/starbucks-design-react';
import { IconHome } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space size={40}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <IconHome />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Channel</Breadcrumb.Item>
        <Breadcrumb.Item>News</Breadcrumb.Item>
      </Breadcrumb>
      <Breadcrumb style={{ fontSize: 12 }}>
        <Breadcrumb.Item>
          <IconHome />
        </Breadcrumb.Item>
        <Breadcrumb.Item>Channel</Breadcrumb.Item>
        <Breadcrumb.Item>News</Breadcrumb.Item>
      </Breadcrumb>
    </Space>
  );
}
