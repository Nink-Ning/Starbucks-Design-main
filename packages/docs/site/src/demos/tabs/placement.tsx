import { useState } from 'react';
import { Radio, Tabs, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {

  const style = {
    textAlign: 'center',
    marginTop: 20,
  };

  const [position, setPosition] = useState('top');
  return (
    <div>
      <Radio.Group
        type="button"
        name="position"
        value={position}
        onChange={setPosition}
        style={{ marginBottom: 40 }}
        options={['left', 'top', 'bottom', 'right']}
      ></Radio.Group>

      <Tabs key="card" tabPosition={position}>
        <Tabs.TabPane key="1" title="Tab 1">
          <Typography.Paragraph style={style}>Content of Tab Panel 1</Typography.Paragraph>
        </Tabs.TabPane>
        <Tabs.TabPane key="2" title="Tab 2">
          <Typography.Paragraph style={style}>Content of Tab Panel 2</Typography.Paragraph>
        </Tabs.TabPane>
        <Tabs.TabPane key="3" title="Tab 3">
          <Typography.Paragraph style={style}>Content of Tab Panel 3</Typography.Paragraph>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
