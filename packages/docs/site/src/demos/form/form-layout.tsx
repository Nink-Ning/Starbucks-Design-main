import React from 'react';
import { Form, Radio, Input, Checkbox, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [layout, setLayout] = React.useState('horizontal');
  return (
    <Form
      style={
        layout === 'inline'
          ? {
              width: '100%',
            }
          : {
              maxWidth: 600,
            }
      }
      autoComplete="off"
      layout={layout}
    >
      <Form.Item label="Layout" >
        <Radio.Group onChange={setLayout} type="button" name="layout" value={layout}>
          <Radio value="horizontal">horizontal</Radio>
          <Radio value="vertical">vertical</Radio>
          <Radio value="inline">inline</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Username" field="username" tooltip={<div>Username is required </div>} rules={[{ required: true }]}>
        <Input style={{ width: 270 }} placeholder="please enter your name" />
      </Form.Item>
      <Form.Item label="Post">
        <Input style={{ width: 270 }} placeholder="please enter your post" />
      </Form.Item>
      <Form.Item
        wrapperCol={
          layout === 'horizontal'
            ? {
                offset: 5,
              }
            : {}
        }
      >
        <Checkbox>I have read the manual</Checkbox>
      </Form.Item>
      <Form.Item
        wrapperCol={
          layout === 'horizontal'
            ? {
                offset: 5,
              }
            : {}
        }
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
