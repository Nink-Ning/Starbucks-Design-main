import { Form, Radio, Input, Select, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [form] = Form.useForm();
  return (
    <div>
      <Form
        form={form}
        autoComplete="off"
        style={{ width: '100%' }}
        onValuesChange={(_, vs) => {
          console.log(vs);
        }}
      >
        <Form.Item field="type" label="门店类型">
          <Radio.Group options={['臻选门店', '标准门店']}></Radio.Group>
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {(values) => {
            return values.type === '臻选门店' ? (
              <Form.Item field="reserveStore" label="臻选门店">
                <Input placeholder="请输入臻选门店名称" />
              </Form.Item>
            ) : (
              values.type === '标准门店' && (
                <Form.Item field="standardStore" label="标准门店">
                  <Select options={['门店 1', '门店 2', '门店 3']} placeholder="请选择标准门店" />
                </Form.Item>
              )
            );
          }}
        </Form.Item>
        <Form.Item noStyle shouldUpdate={(prev, next) => prev.type !== next.type}>
          {(values) => {
            return values.type ? (
              <Form.Item field="remark" label="备注">
                <Input.TextArea placeholder={`${values.type} 备注`} />
              </Form.Item>
            ) : null;
          }}
        </Form.Item>

        <Form.Item wrapperCol={{ span: 17, offset: 5 }}>
          <Button
            onClick={() => {
              console.log(form.getFieldsValue());
            }}
          >
            查看表单值
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
