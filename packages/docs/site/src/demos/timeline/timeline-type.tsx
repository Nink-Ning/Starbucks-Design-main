import { Timeline } from '@sbux/starbucks-design-react';

export default function Demo({ mode }) {
  return (
    <Timeline mode={mode} style={{ flex: 1 }}>
      <Timeline.Item label="2026-03-10">春季拿铁配方确认</Timeline.Item>
      <Timeline.Item label="2026-05-12">冷萃物料到店</Timeline.Item>
      <Timeline.Item label="2026-09-30">
        秋季会员活动上线
      </Timeline.Item>
    </Timeline>
  );
}
