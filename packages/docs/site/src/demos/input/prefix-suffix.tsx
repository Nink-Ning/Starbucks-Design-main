import { Input, Space } from '@sbux/starbucks-design-react';
import { IconUser, IconInfoCircle, IconSearch } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space direction="vertical">
      <Space wrap>
        <Input style={{ width: 350 }} prefix={<IconUser />} placeholder="Enter something" />
        <Input
          allowClear
          style={{ width: 350 }}
          suffix={<IconInfoCircle />}
          placeholder="Enter something"
        />
      </Space>
      <Space wrap>
        <Input
          style={{ width: 350 }}
          prefix={<IconUser />}
          suffix={<IconInfoCircle />}
          placeholder="Enter something"
        />
        <Input
          style={{ width: 350 }}
          addBefore="+86"
          addAfter={<IconSearch />}
          prefix={<IconUser />}
          suffix={<IconInfoCircle />}
          allowClear
          placeholder="Enter something"
        />
      </Space>
    </Space>
  );
}
