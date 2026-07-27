import { Collapse, Divider } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Collapse style={{ maxWidth: 1180 }} defaultActiveKey={['1']} triggerRegion="header">
      <Collapse.Item header="Beijing Toutiao Technology Co., Ltd." name="1">
        Beijing Toutiao Technology Co., Ltd.
        <Divider style={{ margin: '8px 0' }} />
        Beijing Toutiao Technology Co., Ltd.
        <Divider style={{ margin: '8px 0' }} />
        Beijing Toutiao Technology Co., Ltd.
      </Collapse.Item>
    </Collapse>
  );
}
