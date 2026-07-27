import { useState } from 'react';
import { BackTop, Input, Select, Space, Typography } from '@sbux/starbucks-design-react';
import { IconCaretUp } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const easingTypes = [
    'linear',
    'quadIn',
    'quadOut',
    'quadInOut',
    'cubicIn',
    'cubicOut',
    'cubicInOut',
    'quartIn',
    'quartOut',
    'quartInOut',
    'quintIn',
    'quintOut',
    'quintInOut',
    'sineIn',
    'sineOut',
    'sineInOut',
    'bounceIn',
    'bounceOut',
    'bounceInOut',
  ];

  const [easing, setEasing] = useState('linear');
  const [duration, setDuration] = useState(200);
  return (
    <div>
      <Space size={10} style={{ margin: 12 }}>
        <Typography.Text>
          Easing
        </Typography.Text>
        <Select
          onChange={setEasing}
          defaultValue={easing}
          style={{ width: 200 }}
        >
          {easingTypes.map((easing) => (
            <Select.Option key={easing} value={easing}>
              {easing}
            </Select.Option>
          ))}
        </Select>
        <Typography.Text>
          Time
        </Typography.Text>
        <Input
          onChange={setDuration}
          style={{ width: 200 }}
          value={duration}
          placeholder="Please enter the easing time"
        />
      </Space>
      <div
        style={{ position: 'relative' }}
      >
        <BackTop
          easing={easing}
          duration={duration}
          style={{
            position: 'absolute',
            right: 60,
            bottom: 60,
          }}
          visibleHeight={30}
          target={() => document.getElementById('custom_backtop2')}
        >
          <div className="custom-backtop" tabIndex={0} role="button" aria-label="scroll to top">
            <IconCaretUp />
            <br />
            TOP
          </div>
        </BackTop>
        <div
          id="custom_backtop2"
          style={{
            height: 300,
            overflow: 'auto',
            padding: '8px 12px',
          }}
        >
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
          <Typography.Paragraph>This is the content</Typography.Paragraph>
        </div>
      </div>
    </div>
  );
}
