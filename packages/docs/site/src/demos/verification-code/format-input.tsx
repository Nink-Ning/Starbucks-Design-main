import { Typography, VerificationCode } from '@sbux/starbucks-design-react';

export default function Demo() {

  return (
    <div>
      <div style={{width: 200}}>
        <Typography.Paragraph>Only numbers can be entered: </Typography.Paragraph>
      </div>
      <VerificationCode
        style={{ width: 300 }}
        defaultValue="123456"
        validate={({ inputValue }) => {
          return /^\d*$/.test(inputValue) ? inputValue : false;
        }}
      />
      <br />
      <br />

      <div style={{width: 200}}>
        <Typography.Paragraph>Only `a-z` can be entered: </Typography.Paragraph>
      </div>

      <VerificationCode
        style={{ width: 300 }}
        defaultValue="abcdef"
        validate={({ inputValue }) => {
          return /^[a-zA-Z]*$/.test(inputValue) ? inputValue.toLowerCase() : false;
        }}
        />

    </div>
  );
}
