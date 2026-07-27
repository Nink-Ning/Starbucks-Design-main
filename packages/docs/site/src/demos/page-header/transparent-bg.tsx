import { PageHeader, Radio, Message } from '@sbux/starbucks-design-react';

export default function Demo() {
  const ghostBgStyle = {
    backgroundImage: 'radial-gradient(var(--color-fill-3) 1px, rgba(0, 0, 0, 0) 1px)',
    backgroundSize: '16px 16px',
    padding: 20,
  };

  return (
    <>
      <Radio.Group
        mode="fill"
        type="button"
        defaultValue="small"
        style={{ marginBottom: 20 }}
      >
        <Radio value="large">Large</Radio>
        <Radio value="medium">Medium</Radio>
        <Radio value="small">Small</Radio>
      </Radio.Group>
      <div style={ghostBgStyle}>
        <PageHeader
          title="Starbucks"
          subTitle="This is a description"
          backIcon
          onBack={() => Message.info('点击了返回按钮')}
        />
      </div>
    </>
  );
}
