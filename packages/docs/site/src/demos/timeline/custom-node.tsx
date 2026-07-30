import { Space, Timeline } from '@sbux/starbucks-design-react';
import { IconClockCircle, IconCheck } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space size={40}>
      <Timeline>
        <Timeline.Item label="2026-03-10" dotColor="var(--color-success)">
          拿铁配方确认
        </Timeline.Item>
        <Timeline.Item label="2026-05-17">冷萃物料到店</Timeline.Item>
        <Timeline.Item
          label="2026-06-22"
          dot={<IconClockCircle style={{ fontSize: 12, color: 'var(--color-danger)' }} />}
        >
          焦糖玛奇朵库存预警
        </Timeline.Item>
        <Timeline.Item label="2026-09-30" dotColor="var(--bg-color-secondarycomponent-active)">
          秋季会员活动准备
        </Timeline.Item>
      </Timeline>

      <Timeline
      >
        <Timeline.Item
          label="2026-03-10"
          dot={
            <IconCheck
              style={{
                fontSize: 12,
                padding: 2,
                boxSizing: 'border-box',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light)',
              }}
            />
          }
        >
          拿铁配方确认
        </Timeline.Item>
        <Timeline.Item
          label="2026-05-17"
          dot={
            <IconCheck
              style={{
                fontSize: 12,
                padding: 2,
                boxSizing: 'border-box',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-light)',
              }}
            />
          }
        >
          冷萃物料到店
        </Timeline.Item>
        <Timeline.Item label="2026-06-22">焦糖玛奇朵库存预警</Timeline.Item>
        <Timeline.Item label="2026-09-30" dotColor="var(--bg-color-secondarycomponent-active)">
          秋季会员活动准备
        </Timeline.Item>
      </Timeline>

      <Timeline>
        <Timeline.Item label="2026-03-10">拿铁配方确认</Timeline.Item>
        <Timeline.Item label="2026-05-17" dotColor="var(--bg-color-secondarycomponent-active)">
          冷萃物料到店
        </Timeline.Item>
        <Timeline.Item label="2026-09-30" dotColor="var(--bg-color-secondarycomponent-active)">
          秋季会员活动准备
        </Timeline.Item>
      </Timeline>
    </Space>
  );
}
