import { Button, Form, Input, Mentions } from '@sbux/starbucks-design-react';

export default function Demo() {
  const onValuesChange = (changeValue, values) => {
    console.log('onValuesChange: ', changeValue, values);
  };

  return (
    <Form
      style={{ width: 360 }}
      initialValues={{ task: 'Component usage' }}
      onValuesChange={onValuesChange}
    >
      <Form.Item label="Task" field="task" rules={[{ required: true, message: 'Task is required' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Name" field="name" rules={[{ required: true, message: 'Name is required' }]}>
        <Mentions
          placeholder="You can use @ Plato to mention Platon"
          options={['Jack', 'Steven', 'Platon', 'Mary']}
          alignTextarea={false}
          rows={2}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }}>
        <Button style={{ margin: '0 12px' }} type="primary">
          Submit
        </Button>
        <Button>Reset</Button>
      </Form.Item>
    </Form>
  );
}
