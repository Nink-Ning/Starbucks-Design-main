import { Breadcrumb } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Breadcrumb maxCount="3">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Sub Home</Breadcrumb.Item>
        <Breadcrumb.Item>All Channel</Breadcrumb.Item>
        <Breadcrumb.Item>Channel</Breadcrumb.Item>
        <Breadcrumb.Item>News</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
