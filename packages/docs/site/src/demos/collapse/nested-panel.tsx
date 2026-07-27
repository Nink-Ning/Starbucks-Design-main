import { Collapse } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Collapse defaultActiveKey={['1', '2']} style={{ maxWidth: 1180 }}>
      <Collapse.Item header="Beijing Toutiao Technology Co., Ltd." name="1">
        <Collapse defaultActiveKey={'1.1'}>
          <Collapse.Item header="Beijing Toutiao Technology Co., Ltd." name="1.1">
            Beijing Toutiao Technology Co., Ltd.
          </Collapse.Item>
          <Collapse.Item header="Beijing Toutiao Technology Co., Ltd." name="1.2">
            Beijing Toutiao Technology Co., Ltd.
          </Collapse.Item>
        </Collapse>
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
