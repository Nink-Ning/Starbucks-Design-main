import { Collapse } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Collapse accordion style={{ maxWidth: 1180 }}>
      <Collapse.Item header="Beijing Toutiao Technology Co., Ltd." name="1">
        Beijing Toutiao Technology Co., Ltd.
      </Collapse.Item>
      <Collapse.Item header="Beijing Toutiao Technology Co., Ltd." name="2">
        Beijing Toutiao Technology Co., Ltd.
      </Collapse.Item>
      <Collapse.Item header="Beijing Toutiao Technology Co., Ltd." name="3">
        Beijing Toutiao Technology Co., Ltd.
      </Collapse.Item>
    </Collapse>
  );
}
