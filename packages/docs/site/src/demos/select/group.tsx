import { Select } from '@sbux/starbucks-design-react';

export default function Demo() {
  const groups = [
    ['Black tea latte', 'Green tea latte'],
    ['Vanilla Frappuccino', 'Matcha Frappuccino'],
    ['Chocolate milk', 'Banana milk'],
  ];
  return (
    <div>
      <Select showSearch allowClear placeholder="Select drink" style={{ width: 154 }}>
        {groups.map((options, index) => {
          return (
            <Select.OptGroup label={`Group-${index}`} key={index}>
              {options.map((option, index) => (
                <Select.Option key={option} value={option}>
                  {option}
                </Select.Option>
              ))}
            </Select.OptGroup>
          );
        })}
      </Select>
    </div>
  );
}
