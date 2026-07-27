import { Rate, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 15,
        }}
      >
        <Rate defaultValue={5} allowClear />
        <Typography.Text style={{ margin: '0 16px' }}>allowClear: true</Typography.Text>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Rate defaultValue={5} />
        <Typography.Text style={{ margin: '0 16px' }}>allowClear: false</Typography.Text>
      </div>
    </>
  );
}
