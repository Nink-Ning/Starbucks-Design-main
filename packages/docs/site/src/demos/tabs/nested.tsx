import { Tabs, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const style = {
    textAlign: 'center',
    marginTop: 20,
  };

  return (
    <Tabs tabPosition="left">
      <Tabs.TabPane key="tab1" title="Tab 1">
        <div>
          <Tabs>
            <Tabs.TabPane key="tab1" title="Tab 1">
              <Typography.Paragraph style={style}>Content of Tab Panel 1</Typography.Paragraph>
            </Tabs.TabPane>
            <Tabs.TabPane key="tab2" title="Tab 2">
              <Typography.Paragraph style={style}>Content of Tab Panel 2</Typography.Paragraph>
            </Tabs.TabPane>
            <Tabs.TabPane key="tab3" title="Tab 3">
              <Typography.Paragraph style={style}>Content of Tab Panel 3</Typography.Paragraph>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Tabs.TabPane>
      <Tabs.TabPane key="tab2" title="Tab 2">
        <Typography.Paragraph>Content of Tab Panel 2</Typography.Paragraph>
      </Tabs.TabPane>
      <Tabs.TabPane key="tab3" title="Tab 3">
        <Typography.Paragraph>Content of Tab Panel 3</Typography.Paragraph>
      </Tabs.TabPane>
    </Tabs>
  );
}
