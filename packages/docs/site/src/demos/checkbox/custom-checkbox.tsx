import { Checkbox, Space, Tag, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <div
        style={{ marginBottom: 20 }}
      >
        <Checkbox.Group defaultValue={['Beijing']} >
          {['Beijing', 'Shanghai', 'Guangzhou'].map((item) => {
            return (
              <Checkbox key={item} value={item}>
                {({ checked }) => {
                  return (
                    <Tag key={item} color={checked ? 'arcoblue' : ''}>
                      {item}
                    </Tag>
                  );
                }}
              </Checkbox>
            );
          })}
        </Checkbox.Group>
      </div>
      <Checkbox.Group>
        {[1, 2].map((item) => {
          return (
            <Checkbox key={item} value={item}>
              {({ checked }) => {
                return (
                  <Space
                    align="start"
                    className={`custom-checkbox-card ${
                      checked ? 'custom-checkbox-card-checked' : ''
                    }`}
                  >
                    <div className="custom-checkbox-card-mask">
                      <div className="custom-checkbox-card-mask-dot"></div>
                    </div>
                    <div>
                      <div className="custom-checkbox-card-title">Checkbox Card {item}</div>
                      <Typography.Text type="secondary">this is a text</Typography.Text>
                    </div>
                  </Space>
                );
              }}
            </Checkbox>
          );
        })}
      </Checkbox.Group>
    </div>
  );
}
