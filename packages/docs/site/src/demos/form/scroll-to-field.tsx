import { useRef } from 'react';
import { Form, Button, Input } from '@sbux/starbucks-design-react';

export default function Demo() {
  const formRef = useRef();
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          formRef.current && formRef.current.scrollToField('users[9]');
        }}
      >滚动到最后一个字段</Button>
      <Form
        ref={formRef}
        style={{
          width: '100%',
          marginTop: 20,
          paddingRight: 16,
          height: 300,
          overflow: 'auto',
        }}
        autoComplete="off"
        initialValues={{ users: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] }}
      >
        <Form.List field="users">
          {(fields, { add, remove }) => {
            return fields.map((field, index) => {
              return (
                <Form.Item label={'门店' + (index + 1)} key={field.key} field={field.field}>
                  <Input placeholder="请输入门店信息" />
                </Form.Item>
              );
            });
          }}
        </Form.List>
      </Form>
    </div>
  );
}
