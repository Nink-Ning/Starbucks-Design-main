import { Radio } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Radio.Group defaultValue="a" style={{ marginBottom: 20 }}>
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
        <Radio value="c">C</Radio>
        <Radio disabled value="d">
          D
        </Radio>
      </Radio.Group>
      <br />
      <Radio.Group options={['A', 'B', 'C', 'D']} style={{ marginBottom: 20 }} />
      <br />
      <Radio.Group
        options={[
          {
            label: 'A',
            value: 'a',
          },
          {
            label: 'B',
            value: 'b',
          },
          {
            label: 'C',
            value: 'c',
          },
          {
            label: 'D',
            value: 'd',
            disabled: true,
          },
        ]}
      />
    </div>
  );
}
