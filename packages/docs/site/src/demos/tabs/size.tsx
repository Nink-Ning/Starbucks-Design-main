import { useState } from 'react';
import { Radio, Tabs, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {

  const style = {
    textAlign: 'center',
    marginTop: 20,
  };

  const [type, setType] = useState('line');
  const [size, setSize] = useState('default');
  return (
    <div>
      <span style={{ marginRight: 20 }}>Size:</span>
      <Radio.Group name="size" value={size} onChange={setSize} style={{ marginBottom: 24 }}>
        <Radio value="mini">mini</Radio>
        <Radio value="small">small</Radio>
        <Radio value="default">default</Radio>
        <Radio value="large">large</Radio>
      </Radio.Group>
      <br />
      <span style={{ marginRight: 20 }}>Type:</span>
      <Radio.Group name="type" value={type} onChange={setType} style={{ marginBottom: 40 }}>
        <Radio value="line">line</Radio>
        <Radio value="card">card</Radio>
        <Radio value="card-gutter">card-gutter</Radio>
        <Radio value="text">text</Radio>
        <Radio value="rounded">rounded</Radio>
        <Radio value="capsule">capsule</Radio>
      </Radio.Group>

      <Tabs type={type} size={size}>
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
