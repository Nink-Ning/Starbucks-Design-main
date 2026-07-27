import React from 'react';
import { Cascader, Checkbox } from '@sbux/starbucks-design-react';

export default function Demo() {
  const options = [
    {
      value: 'shanghai',
      label: 'Shanghai',
      children: [
        {
          value: 'shanghaishi',
          label: 'Shanghai',
          children: [
            {
              value: 'huangpu',
              label: 'Huangpu',
              children: [],
            },
            {
              value: 'jingan',
              label: 'Jingan',
            },
          ],
        },
      ],
    },
    {
      value: 'beijing',
      label: 'Beijing',
      children: [
        {
          value: 'Beijing',
          label: 'Beijing',
          children: [],
        },
      ],
    },
  ];

  const [checked, setChecked] = React.useState(false);
  const [value, setValue] = React.useState();
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Checkbox
          onChange={(v) => {
            setChecked(v);
            setValue();
          }}
        >
          showEmptyChildren
        </Checkbox>
      </div>
      <Cascader
        showSearch
        allowClear
        value={value}
        onChange={setValue}
        placeholder="Please select ..."
        showEmptyChildren={checked}
        style={{ width: 300 }}
        options={options}
      />
    </div>
  );
}
