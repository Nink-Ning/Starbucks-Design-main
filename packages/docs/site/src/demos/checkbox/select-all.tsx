import { useState } from 'react';
import { Checkbox } from '@sbux/starbucks-design-react';

export default function Demo() {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [value, setValue] = useState([0, 1]);

  function onChangeAll(checked) {
    if (checked) {
      setIndeterminate(false);
      setCheckAll(true);
      setValue([0, 1, 2]);
    } else {
      setIndeterminate(false);
      setCheckAll(false);
      setValue([]);
    }
  }

  function onChange(checkList) {
    setIndeterminate(!!(checkList.length && checkList.length !== options.length));
    setCheckAll(!!(checkList.length === options.length));
    setValue(checkList);
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Checkbox onChange={onChangeAll} checked={checkAll} indeterminate={indeterminate}>
          {checkAll ? 'unCheck All' : 'Check All'}
        </Checkbox>
      </div>
      <Checkbox.Group
        value={value}
        options={options.map((x, i) => ({
          label: x,
          value: i,
        }))}
        onChange={onChange}
      />
    </div>
  );
}
