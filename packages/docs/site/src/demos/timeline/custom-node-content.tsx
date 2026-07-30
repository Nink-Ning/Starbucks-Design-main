import { Timeline } from '@sbux/starbucks-design-react';
import { IconExclamationCircleFill } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <div>
      <Timeline>
        <Timeline.Item label="2026-03-10" dotColor="var(--color-success)">
          春季拿铁配方确认
        </Timeline.Item>
        <Timeline.Item label="2026-05-22">冷萃咖啡物料配送</Timeline.Item>
        <Timeline.Item label="2026-06-22" dotColor="var(--color-danger)">
          焦糖玛奇朵库存预警
          <IconExclamationCircleFill
            style={{
              color: 'var(--color-danger)',
              fontSize: 12,
              marginLeft: 4,
            }}
          />
        </Timeline.Item>
        <Timeline.Item label="2026-09-30" dotColor="var(--bg-color-secondarycomponent-active)">
          秋季会员活动上线
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
