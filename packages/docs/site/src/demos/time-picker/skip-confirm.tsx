import { TimePicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  const style = {
    width: 194,
    margin: '0 24px 24px 0',
  };

  function onSelect(valueString, value) {
    console.log('onSelect', valueString, value);
  }

  function onChange(valueString, value) {
    console.log('onChange', valueString, value);
  }

  return (
    <div>
      <TimePicker disableConfirm style={style} onSelect={onSelect} onChange={onChange} />
      <TimePicker.RangePicker
        disableConfirm
        style={{ ...style, width: 252 }}
        onSelect={onSelect}
        onChange={onChange}
      />
    </div>
  );
}
