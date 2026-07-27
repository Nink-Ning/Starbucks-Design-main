import { VerificationCode } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <VerificationCode style={{width: 400}} length={9}  separator={({ index, character }) => {
    return ((index + 1) % 3 || index > 7 )? null : '-'
  }}     />
  );
}
