import React from 'react';
import { Button, Message, Space, Statistic } from '@sbux/starbucks-design-react';

export default function Demo() {
  const now = Date.now();
  const [start, setStart] = React.useState(false);

  const _now = Date.now();

  return (
    <Space direction="vertical" size={40}>
      <Space size={60}>
        <Statistic.Countdown title="Countdown" value={now + 1000 * 60 * 60 * 2} now={now} />
        <Statistic.Countdown
          value={now + 1000 * 60 * 60 * 2}
          now={now}
          renderFormat={(_diff, _value) => {
            const minutes = Math.floor(_diff / (1000 * 60));
            const seconds = Math.floor(_diff / 1000);
            let diffTimes = '';
            if (minutes) {
              diffTimes = `${minutes}min 后`;
            } else {
              diffTimes = `${seconds}s 后`;
            }
            return <Statistic title="Countdown renderFormat" value={_value} suffix={diffTimes} />;
          }}
        />
        <Statistic.Countdown
          title="Milliseconds"
          value={now + 1000 * 60 * 60 * 2}
          format="HH:mm:ss.SSS"
          now={now}
        />
      </Space>
      <Space align="start" size={40}>
        <Statistic.Countdown
          title="Days"
          value={now + 1000 * 60 * 60 * 24 * 4}
          format="D 天 H 时 m 分 s 秒"
          now={now}
        />
        <div>
          <Statistic.Countdown
            title="Trigger on finish"
            value={_now + 1000 * 5}
            format="HH:mm:ss.SSS"
            start={start}
            now={_now}
            onFinish={() => {
              Message.info({
                content: 'Finish!',
              });
              setStart(false);
            }}
          />
          <Button
            onClick={() => {
              setStart(true);
            }}
            style={{ display: 'block', marginTop: 10 }}
            type="primary"
          >
            Start
          </Button>
        </div>
      </Space>
    </Space>
  );
}
