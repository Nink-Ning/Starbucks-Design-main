import { Pagination, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Space direction="vertical" size="large">
        <Pagination sizeCanChange total={200} bufferSize={0} defaultCurrent={10} />
        <Pagination sizeCanChange total={200} bufferSize={1} defaultCurrent={10} />
        <Pagination sizeCanChange total={200} bufferSize={2} defaultCurrent={10} />
      </Space>
    </div>
  );
}
