import { Radio } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Radio.Group direction="vertical" defaultValue="a">
        <Radio value="a">A</Radio>
        <Radio value="b">B</Radio>
        <Radio value="c">C</Radio>
        <Radio disabled value="d">
          D
        </Radio>
      </Radio.Group>
    </div>
  );
}
