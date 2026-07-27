import { InputTag, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Space style={{ marginBottom: 20 }}>
        <InputTag
          style={{ width: 350 }}
          placeholder="Please input"
          defaultValue={['1', '2', '3', '4', '5']}
          maxTagCount={3}
        />
        <InputTag
          style={{ width: 350 }}
          placeholder="Please input"
          defaultValue={['11', '22', '33', '4', '55']}
          maxTagCount={{
            count: 3,
            render: (invisibleTagCount) => (
              <span key="more" style={{ marginLeft: 4, fontSize: 12 }}>
                {invisibleTagCount} More
              </span>
            ),
          }}
        />
      </Space>
    </div>
  );
}
