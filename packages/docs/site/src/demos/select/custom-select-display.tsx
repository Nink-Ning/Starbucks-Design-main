import { Select, Space } from '@sbux/starbucks-design-react';
import { IconStar, IconDelete } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const data = ['Beijing', 'Guangzhou', 'Shanghai', 'Shenzhen'];
  return (
    <Space size="large">
      <Select
        placeholder="Select city"
        style={{ width: 345, }}
        renderFormat={(option, value) => {
          return option ? (
            <span>
              <IconStar style={{ color: '#f7ba1e', }} />
              {` ${option.value} `}
            </span>
          ) : (
            value
          );
        }}
      >
        {data.map((item, index) => (
          <Select.Option value={item} key={index}>
            {item}
          </Select.Option>
        ))}
      </Select>

      <Select
        placeholder="Select city"
        style={{ width: 345, }}
        mode="multiple"
        removeIcon={<IconDelete />}
        defaultValue={['Beijing', 'Shenzhen']}
        renderFormat={(option, value) => {
          // When labelInValue is true, the value is an object
          return option ? (
            <span>
              <IconStar
                style={{
                  color: '#f7ba1e',
                }}
              />
              {` ${option.value} City `}
            </span>
          ) : (
            value
          );
        }}
      >
        {data.map((item, index) => (
          <Select.Option value={item} key={index}>
            {item}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
}
