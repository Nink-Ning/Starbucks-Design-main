import { Input, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space wrap>
      <Input.Search allowClear placeholder="Enter keyword to search" style={{ width: 350 }} />
      <Input.Search
        searchButton
        defaultValue="Search content"
        placeholder="Enter keyword to search"
        style={{ width: 350 }}
      />
      <Input.Search
        searchButton="Search"
        defaultValue="Search content"
        placeholder="Enter keyword to search"
        style={{ width: 350 }}
      />
    </Space>
  );
}
