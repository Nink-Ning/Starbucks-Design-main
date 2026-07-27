import { Empty } from '@sbux/starbucks-design-react';
import { IconExclamation } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Empty
      icon={
        <div
          style={{
            background: '#f2994b',
            display: 'inline-flex',
            borderRadius: '50%',
            width: 50,
            height: 50,
            fontSize: 30,
            alignItems: 'center',
            color: 'white',
            justifyContent: 'center',
          }}
        >
          <IconExclamation />
        </div>
      }
      description="No data, please reload!"
    />
  );
}
