import { Form, Input, Grid, Button, Space } from '@sbux/starbucks-design-react';
import { IconDelete, IconArrowRise, IconArrowFall } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const [form] = Form.useForm();
  const postsState = Form.useFormState('posts', form) || {};

  console.log(postsState, '____');

  return (
    <div>
      <Form
        form={form}
        style={{ width: 600 }}
        autoComplete="off"
        initialValues={{
          users: ['Username'],
          posts: ['post1'],
        }}
        onSubmit={(v) => {
          console.log(v);
        }}
        onValuesChange={(_, v) => {
          console.log(_, v);
        }}
      >
        <Form.Item label="Username" field="username" style={{ width: 370 }}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Form.List
            rules={[
              {
                validator(v, cb) {
                  if (v?.length < 2) {
                    return cb('必须超过两条');
                  }
                  return cb();
                },
              },
            ]}
            field="posts"
          >
            {(fields, { add, remove, move }) => {
              return (
                <div>
                  {fields.map((item, index) => {
                    return (
                      <Grid.Row key={item.key}>
                        <Form.Item
                          field={item.field}
                          label={'Post-' + index}
                          style={{
                            width: 370,
                          }}
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>

                        <Button
                          icon={<IconDelete />}
                          shape="circle"
                          status="danger"
                          style={{
                            margin: '0 20px',
                          }}
                          onClick={() => remove(index)}
                        ></Button>
                        <Button
                          shape="circle"
                          onClick={() => move(index, index > 0 ? index - 1 : index + 1)}
                        >
                          {index > 0 ? <IconArrowRise /> : <IconArrowFall />}
                        </Button>
                      </Grid.Row>
                    );
                  })}
                  <Space size={20}>
                    <Button
                      onClick={() => {
                        add();
                      }}
                    >
                      Add post
                    </Button>
                    <Button
                      onClick={() => {
                        add('new 2', 1);
                      }}
                    >
                      Add post to the second slot
                    </Button>
                  </Space>
                </div>
              );
            }}
          </Form.List>
        </Form.Item>
        <Form.Item style={{ marginTop: 20 }}>
          <Space size={20}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              onClick={() => {
                form.resetFields()
              }}
            >
              Reset
            </Button>
            <Button
              status="danger"
              onClick={() => {
                form.setFields({
                  'posts[0]': {
                    error: {
                      message: 'error',
                    },
                  },
                });
              }}
            >
              Set `Post-0` to error state
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
