import { Timeline, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Timeline>
        <Timeline.Item label="2026-03-10" lineType="dashed">
          春季拿铁配方确认
          <br />
          <Typography.Text
            type="secondary"
            style={{
              fontSize: 12,
              marginTop: 4,
            }}
          >
            完成门店试饮反馈整理。
          </Typography.Text>
        </Timeline.Item>
        <Timeline.Item label="2026-05-12" lineType="dashed">
          冷萃咖啡物料配送
          <br />
          <Typography.Text
            type="secondary"
            style={{
              fontSize: 12,
              marginTop: 4,
            }}
          >
            预计分批送达重点门店。
          </Typography.Text>
        </Timeline.Item>
        <Timeline.Item label="2026-09-30" lineType="dashed">
          秋季会员活动上线
          <br />
          <Typography.Text
            type="secondary"
            style={{
              fontSize: 12,
              marginTop: 4,
            }}
          >
            小程序与门店海报同步生效。
          </Typography.Text>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
