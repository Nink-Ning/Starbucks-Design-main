import { useState } from 'react';
import { Tabs, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {

  const style = {
    textAlign: 'center',
    marginTop: 20,
  };

  const [activeTab, setActiveTab] = useState('1');
  return (
    <Tabs activeTab={activeTab} onChange={setActiveTab}>
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
  );
}
