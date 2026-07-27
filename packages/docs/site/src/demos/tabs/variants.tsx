import { useState } from 'react';
import { Radio, Tabs, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {

  const style = {
    textAlign: 'center',
    marginTop: 20,
  };

  const [type, setType] = useState('line');
  return (
    <div>
      <Radio.Group name="type" value={type} onChange={setType} style={{ marginBottom: 40 }}>
        <Radio value="line">line</Radio>
        <Radio value="card">card</Radio>
        <Radio value="card-gutter">card-gutter</Radio>
        <Radio value="text">text</Radio>
        <Radio value="rounded">rounded</Radio>
        <Radio value="capsule">capsule</Radio>
      </Radio.Group>

      <Tabs type={type}>
        <Tabs.TabPane key="1" title="Tab 1">
          <Typography.Paragraph style={style}>Content of Tab Panel 1</Typography.Paragraph>
        </Tabs.TabPane>
        <Tabs.TabPane key="2" title="Tab 2" disabled>
          <Typography.Paragraph style={style}>Content of Tab Panel 2</Typography.Paragraph>
        </Tabs.TabPane>
        <Tabs.TabPane key="3" title="Tab 3">
          <Typography.Paragraph style={style}>Content of Tab Panel 3</Typography.Paragraph>
        </Tabs.TabPane>
        <Tabs.TabPane key="4" title="Tab 4">
          <Typography.Paragraph style={style}>Content of Tab Panel 4</Typography.Paragraph>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
