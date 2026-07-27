import { Input, Space } from '@sbux/starbucks-design-react';
import { IconSearch } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space direction="vertical" size="large">
      <Input.Search
        style={{ width: 320 }}
        placeholder="Please enter something"
        searchButton="Search"
      />
      <Input.Search
        style={{ width: 320 }}
        placeholder="Please enter something"
        searchButton={
          <>
            <IconSearch />
            Search
          </>
        }
      />
    </Space>
  );
}
