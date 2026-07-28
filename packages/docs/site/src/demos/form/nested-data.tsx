import { useRef, useState } from 'react';
import { Form, Grid, Input, Select, Tooltip, Button } from '@sbux/starbucks-design-react';
import { IconExclamationCircle } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const formRef = useRef();
  const [values, setValues] = useState({});
  return (
    <div>
      <Form
        ref={formRef}
        style={{ width: '100%' }}
        initialValues={{ city: '上海市' }}
        autoComplete="off"
        onSubmit={(values) => {
          console.log(values);
        }}
        onValuesChange={(_, values) => {
          console.log(values);
        }}
      >
        <Form.Item label="门店信息" required style={{ marginBottom: 24 }}>
          <Grid.Row gutter={8}>
            <Grid.Col span={12}>
              <Form.Item field="name" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                <Input placeholder="请输入门店名称" />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={12}>
              <Form.Item field="age" rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                <Input placeholder="请输入运营年限" />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
        </Form.Item>
        <Form.Item label="门店类型" required>
          <Grid.Row align="center">
            <Form.Item field="gender" noStyle={{ showErrorTip: true }} rules={[{ required: true }]}>
              <Select
                options={['旗舰店', '臻选店', '标准店']}
                placeholder="请选择门店类型"
                style={{ flex: 1 }}
              />
            </Form.Item>
            <Tooltip content="必须填写哦">
              <IconExclamationCircle style={{ margin: '0 8px', color: 'var(--color-primary)' }} />
            </Tooltip>
          </Grid.Row>
        </Form.Item>
        <Form.Item label="所属区域" field="province" rules={[{ required: true }]}>
          <Select allowClear placeholder="请选择" options={['上海市', '广州市']}></Select>
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {(values) => {
            return values.province ? (
              <Form.Item field="city" key="city" label="城市">
                <Select allowClear placeholder="请选择" options={[values.province]}></Select>
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
        <Form.Item label=" ">
          <div style={{ display: 'flex', gap: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button
              onClick={() => {
                formRef.current.resetFields();
              }}
            >
              重置
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
