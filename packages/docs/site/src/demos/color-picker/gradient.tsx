import { ColorPicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  const defaultValue = [
    {
      color: '#165DFFAA',
      percent: 0,
    },
    {
      color: '#00B42AFF',
      percent: 100,
    },
  ];
  return (
    <div>
      <ColorPicker defaultValue={defaultValue} mode={['single', 'gradient']} showText />
      <br />
      <ColorPicker defaultValue={defaultValue} mode="gradient" showText />
    </div>
  );
}
