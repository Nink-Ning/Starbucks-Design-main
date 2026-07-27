import { InputTag, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Space style={{ marginBottom: 20 }}>
        <InputTag
          style={{ width: 300 }}
          placeholder="Please input"
          defaultValue={['label 1', 'label 2', 'label 3', 'label 4', 'label 5']}
          maxTagCount="responsive"
        />
        <InputTag
          style={{ width: 300 }}
          placeholder="Please input"
          defaultValue={['label 1', 'label 2', 'label 3', 'label 4', 'label 5']}
          maxTagCount={{
            count: 'responsive',
            render: (invisibleTagCount) => (
              <span style={{ marginLeft: 4, fontSize: 12 }}>+{invisibleTagCount} More</span>
            ),
          }}
        />
      </Space>
    </div>
  );
}
