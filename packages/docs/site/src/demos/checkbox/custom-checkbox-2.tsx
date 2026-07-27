import { Button, Checkbox } from '@sbux/starbucks-design-react';

export default function Demo() {
  const options = [...Array(6)].map((_, i) => ({
    label: `Option ${i}`,
    value: i,
  }));

  // Demo1 logic
  const {
    selected: selected1,
    selectAll: selectAll1,
    setSelected: setSelected1,
    unSelectAll: unSelectAll1,
    isAllSelected: isAllSelected1,
    isPartialSelected: isPartialSelected1,
    toggle: toggle1,
  } = Checkbox.useCheckbox(
    options.map((x) => x.value),
    [1, 2]
  );

  // Demo2 logic
  const {
    selectAll: selectAll2,
    isSelected,
    unSelectAll: unSelectAll2,
    isAllSelected: isAllSelected2,
    isPartialSelected: isPartialSelected2,
    toggle: toggle2,
    setValueSelected,
  } = Checkbox.useCheckbox(
    options.map((x) => x.value),
    [1, 2]
  );

  // Demo3 logic
  const options2 = options.map((x, i) => {
    return {
      value: x.value,
      label: 'Option' + x.value,
      disabled: !(i % 2),
    };
  });
  const { selected: selected3, setSelected: setSelected3 } = Checkbox.useCheckbox(
    options2.map((x) => x.value),
    [1, 2]
  );

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Checkbox
          onChange={(checked) => {
            if (checked) {
              selectAll1();
            } else {
              unSelectAll1();
            }
          }}
          checked={isAllSelected1()}
          indeterminate={isPartialSelected1()}
        >
          Check All
        </Checkbox>
        <Button
          size="small"
          type="primary"
          style={{ margin: '0 16px' }}
          onClick={() => { toggle1() }}
        >
          Inverse Check
        </Button>
      </div>
      <Checkbox.Group value={selected1} options={options} onChange={setSelected1} />

      <div style={{ marginTop: 24, marginBottom: 16 }}>
        <Checkbox
          onChange={(checked) => {
            if (checked) {
              selectAll2();
            } else {
              unSelectAll2();
            }
          }}
          checked={isAllSelected2()}
          indeterminate={isPartialSelected2()}
        >
          Check All
        </Checkbox>

        <Button
          size="small"
          type="primary"
          style={{ margin: '0 16px' }}
          onClick={() => {
            toggle2();
          }}
        >
          Inverse Check
        </Button>
      </div>
      {options.map((option) => {
        return (
          <Checkbox
            key={option.value}
            style={{ margin: '0 16px' }}
            checked={isSelected(option.value)}
            value={option.value}
            onChange={(checked) => {
              setValueSelected(option.value, checked);
            }}
          >
            {option.label}
          </Checkbox>
        );
      })}

      <div
        style={{ margin: '16px 0' }}
      >
        <Button
          size="small"
          type="primary"
          onClick={() => {
            setSelected3(options2.filter((x) => !x.disabled).map((x) => x.value));
          }}
        >
          Check undisabled Options
        </Button>
      </div>
      <Checkbox.Group value={selected3} onChange={setSelected3} options={options2}></Checkbox.Group>
    </div>
  );
}
