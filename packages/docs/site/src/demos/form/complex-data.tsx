import React from 'react';
import { Form, Input } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [values, setValues] = React.useState();
  return (
    <div>
      <Form
        style={{ width: '100%' }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        autoComplete="off"
        onValuesChange={(_, values) => {
          console.log(values);
          setValues(values);
        }}
      >
        <Form.Item label="门店名称" field="user.username" rules={[{ required: true }]}>
          <Input placeholder="请输入门店名称" />
        </Form.Item>
        <Form.Item label="岗位" field="user.post" rules={[{ required: true }]}>
          <Input placeholder="请输入岗位" />
        </Form.Item>

        <Form.Item label="协作人">
          <Form.Item label="协作人1" field="user.volunteers[0]" rules={[{ required: true }]}>
            <Input placeholder="请输入岗位" />
          </Form.Item>

          <Form.Item label="协作人2" field="user.volunteers[1]" rules={[{ required: true }]}>
            <Input placeholder="请输入岗位" />
          </Form.Item>
        </Form.Item>
      </Form>
      <div style={{ color: 'var(--color-text-2)' }}>
        <p>Form data:</p>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
    </div>
  );
}
