import { Form, Input, Checkbox, Button } from '@sbux/starbucks-design-react';

const labelCol = {
  style: { width: 96, maxWidth: 96, flex: '0 0 96px' },
};

const wrapperCol = {
  style: { flex: '1 1 0', maxWidth: 'none' },
};

const noLabelWrapperCol = {
  style: { flex: '1 1 0', maxWidth: 'none', marginLeft: 96 },
};

export default function Demo() {
  return (
    <Form style={{ width: '100%' }} autoComplete="off" labelCol={labelCol} wrapperCol={wrapperCol}>
      <Form.Item label="输入框">
        <Input placeholder="请输入内容..." />
      </Form.Item>
      <Form.Item label="文本域">
        <Input.TextArea placeholder="请输入内容..." autoSize={{ minRows: 3 }} />
      </Form.Item>
      <Form.Item wrapperCol={noLabelWrapperCol}>
        <Checkbox>我已阅读门店配置说明</Checkbox>
      </Form.Item>
      <Form.Item wrapperCol={noLabelWrapperCol}>
        <Button type="primary">提交</Button>
      </Form.Item>
    </Form>
  );
}
