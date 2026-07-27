import { useState } from 'react';
import { Radio, Space, Tabs } from '@sbux/starbucks-design-react';

export default function Demo() {

  const paneStyle = {
    width: '100%',
    height: 50,
    padding: '24px 0',
    color: '#939aa3',
  };
  const tabs = [...new Array(30)].map((x, i) => ({
    title: `标签${i + 1}`,
    key: `key${i + 1}`,
    content: `标签${i + 1}内容`,
  }));

  const [direction, setDirection] = useState('horizontal');
  const [position, setPosition] = useState('auto');
  return (
    <div>
      <Space direction="vertical" style={{ marginBottom: 40 }}>
        <Radio.Group
          type="button"
          name="direction"
          value={direction}
          onChange={setDirection}
          options={['horizontal', 'vertical']}
        ></Radio.Group>
        <Radio.Group
          type="button"
          name="direction"
          value={position}
          onChange={setPosition}
          options={['auto', 'start', 'end', 'center']}
        ></Radio.Group>
      </Space>

      <Tabs
        defaultActiveTab="key1"
        direction={direction}
        style={{ height: 200 }}
        scrollPosition={position}
      >
        {tabs.map((x, i) => (
          <Tabs.TabPane destroyOnHide key={x.key} title={x.title}>
            <div style={paneStyle}>{`这里是${x.content}`}</div>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
}
