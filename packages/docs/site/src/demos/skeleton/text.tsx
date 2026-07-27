import { Skeleton } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Skeleton
      text={{
        rows: 3,
        width: ['100%', 600, 400]
      }}
      image
    ></Skeleton>
  );
}
