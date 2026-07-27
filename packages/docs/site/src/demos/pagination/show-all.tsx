import { Pagination } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Pagination
        showTotal
        total={200}
        showJumper
        sizeCanChange
        style={{ width: 800, marginBottom: 20 }}
      />
      <Pagination disabled showTotal total={200} showJumper sizeCanChange style={{ width: 800 }} />
    </div>
  );
}
