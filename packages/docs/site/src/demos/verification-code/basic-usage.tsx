import { VerificationCode, Message } from '@sbux/starbucks-design-react';

export default function Demo() {
  return <VerificationCode
    style={{width: 300}}
    onChange={v => {
      console.log(v)
    }}
    onFinish={v => {
      Message.info('onFinish: ' + v)
    }}
  />;
}
