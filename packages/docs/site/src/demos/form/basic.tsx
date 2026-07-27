import { Form, Input, Checkbox, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Form style={{ width: 600 }} autoComplete="off">
      <Form.Item label="Username">
        <Input placeholder="please enter your username..." />
      </Form.Item>
      <Form.Item label="Post">
        <Input placeholder="please enter your post..." />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }}>
        <Checkbox>I have read the manual</Checkbox>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }}>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
}
