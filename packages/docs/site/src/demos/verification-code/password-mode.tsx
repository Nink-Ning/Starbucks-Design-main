import { VerificationCode, Message } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <VerificationCode
        defaultValue="123"
        masked
        style={{ width: 300 }}
        onChange={(v) => {
          console.log(v);
        }}
        onFinish={(v) => {
          Message.info('onFinish: ' + v);
        }}
      />
    </div>
  );
}
