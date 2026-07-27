import React from 'react';
import { Form, Input, InputNumber, Message } from '@sbux/starbucks-design-react';

export default class Demo extends React.Component {
  onSubmit = () => {
    this.form
      .validate()
      .then((values) => {
        Message.info('提交成功！');
        console.log('Values: ', values);
      })
      .catch((error) => {
        console.log(error.message);
        console.log(error.errors);
      });
  };
  onValuesChange = (value, allValues) => {
    console.log(value, allValues);
  };

  render() {
    return (
      <Form
        ref={(ref) => (this.form = ref)}
        autoComplete="off"
        style={{ maxWidth: 650 }}
        onValuesChange={this.onValuesChange}
      >
        <Form.Item label="姓名" required extra="请输入长度在 1 - 10 的名字，注意不要使用特殊符号。">
          <Form.Control
            field="name"
            rules={[
              {
                required: true,
              },
              {
                maxLength: 10,
                message: '最多可以输入十个字!',
              },
            ]}
          >
            <Input placeholder="please enter..." />
          </Form.Control>
        </Form.Item>
        <Form.Item label="数字" required>
          <Form.Control field="number" rules={[{ type: 'number', required: true }]}>
            <InputNumber placeholder="请输入数字" />
          </Form.Control>
        </Form.Item>
      </Form>
    );
  }
}
