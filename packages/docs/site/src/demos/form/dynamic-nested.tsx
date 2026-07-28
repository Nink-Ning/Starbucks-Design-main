import { useRef } from 'react';
import { Form, Space, Input, Button } from '@sbux/starbucks-design-react';
import { IconDelete } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const formRef = useRef();
  return (
    <div>
      <Form
        ref={formRef}
        style={{ width: '100%' }}
        autoComplete="off"
        initialValues={{
          users: [
            {
              username: '咖啡师 A',
              address: '上海烘焙工坊',
            },
          ],
        }}
        onValuesChange={(_, v) => {
          console.log(_, v);
        }}
      >
        <Form.List field="users">
          {(fields, { add, remove, move }) => {
            return (
              <div>
                {fields.map((item, index) => {
                  return (
                    <div key={item.key}>
                      <Form.Item label={'门店人员 ' + (index + 1)}>
                        <Space>
                          <Form.Item
                            field={item.field + '.username'}
                            rules={[{ required: true }]}
                            noStyle
                          >
                            <Input placeholder="请输入人员姓名" />
                          </Form.Item>
                          <Form.Item
                            field={item.field + '.address'}
                            rules={[{ required: true }]}
                            noStyle
                          >
                            <Input placeholder="请输入所属门店" />
                          </Form.Item>
                          <Button
                            aria-label="删除门店人员"
                            icon={<IconDelete />}
                            shape="circle"
                            status="danger"
                            type="text"
                            onClick={() => remove(index)}
                          ></Button>
                        </Space>
                      </Form.Item>
                    </div>
                  );
                })}
                <Form.Item wrapperCol={{ offset: 5 }}>
                  <Button
                    onClick={() => {
                      add();
                    }}
                  >
                    新增门店人员
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </Form>
    </div>
  );
}
