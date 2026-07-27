import { Slider } from '@sbux/starbucks-design-react';

export default function Demo() {
  function formatTooltip(val) {
    return <span>{val}%</span>;
  }

  return (
    <div style={{ width: 200 }}>
      <Slider defaultValue={20} formatTooltip={formatTooltip} />
    </div>
  );
}
