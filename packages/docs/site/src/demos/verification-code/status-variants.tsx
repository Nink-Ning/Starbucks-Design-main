import { Space, Typography, VerificationCode } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Space>
        <div style={{width: 80}}>
          <Typography.Text >Disabled</Typography.Text>
        </div>
        <VerificationCode defaultValue={'123456'} disabled style={{width: 300}}/>
      </Space>
      <br/>
      <br/>
      <Space>
        <div style={{width: 80}}>
          <Typography.Text>ReadOnly</Typography.Text>
        </div>
        <VerificationCode defaultValue={'123456'} readOnly style={{width: 300}}/>
      </Space>
      <br/>
      <br/>
      <Space>
        <div style={{width: 80}}>
          <Typography.Text>Error</Typography.Text>
        </div>
        <VerificationCode status="error" style={{width: 300}}/>
      </Space>
    </div>
  );
}
