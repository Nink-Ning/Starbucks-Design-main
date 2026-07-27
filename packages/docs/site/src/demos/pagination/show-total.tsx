import { Pagination } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Pagination
        showTotal
        total={50}
        style={{
          marginBottom: 20,
        }}
      />
      <Pagination
        showTotal={(total, range) => <span>{`${range[0]} - ${range[1]} of ${total} items`}</span>}
        total={200}
      />
    </div>
  );
}
