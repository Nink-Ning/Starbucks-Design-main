import { Tabs, Typography } from '@sbux/starbucks-design-react';
import { IconCalendar, IconClockCircle, IconUser } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const style = {
    textAlign: 'center',
    marginTop: 20,
  };

  return (
    <Tabs defaultActiveTab="1">
      <Tabs.TabPane
        key="1"
        title={
          <span>
            <IconCalendar style={{ marginRight: 6 }} />
            Tab 1
          </span>
        }
      >
        <Typography.Paragraph style={style}>Content of Tab Panel 1</Typography.Paragraph>
      </Tabs.TabPane>
      <Tabs.TabPane
        key="2"
        title={
          <span>
            <IconClockCircle style={{ marginRight: 6 }} />
            Tab 2
          </span>
        }
        disabled
      >
        <Typography.Paragraph style={style}>Content of Tab Panel 2</Typography.Paragraph>
      </Tabs.TabPane>
      <Tabs.TabPane
        key="3"
        title={
          <span>
            <IconUser style={{ marginRight: 6 }} />
            Tab 3
          </span>
        }
      >
        <Typography.Paragraph style={style}>Content of Tab Panel 3</Typography.Paragraph>
      </Tabs.TabPane>
    </Tabs>
  );
}
