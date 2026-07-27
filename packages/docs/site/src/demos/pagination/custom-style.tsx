import { Pagination } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Pagination
        total={200}
        style={{ marginBottom: 20 }}
        pageItemStyle={{ background: 'var(--color-bg-2)', marginRight: 2 }}
        activePageItemStyle={{ background: 'var(--color-fill-2)' }}
      />
      <Pagination
        total={200}
        pageItemStyle={{ background: 'var(--color-bg-2)' }}
        activePageItemStyle={{ background: 'var(--color-fill-2)' }}
      />
    </div>
  );
}
