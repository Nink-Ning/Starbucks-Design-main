import { PageHeader, Radio } from '@sbux/starbucks-design-react';

export default function Demo() {
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
      <div style={{ background: 'var(--color-fill-2)', padding: 40 }}>
        <PageHeader
          style={{ background: 'var(--color-bg-2)' }}
          title="Starbucks"
          subTitle="This is a description"
        />
      </div>
    </>
  );
}
