import React from 'react';
import { Form, Radio, Input, Checkbox, Button } from '@sbux/starbucks-design-react';

const horizontalLabelCol = {
  style: { width: 96, maxWidth: 96, flex: '0 0 96px' },
};

const horizontalWrapperCol = {
  style: { flex: '1 1 0', maxWidth: 'none' },
};

const horizontalNoLabelWrapperCol = {
  style: { flex: '1 1 0', maxWidth: 'none', marginLeft: 96 },
};

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
              width: '100%',
            }
      }
      autoComplete="off"
      layout={layout}
      labelCol={layout === 'horizontal' ? horizontalLabelCol : undefined}
      wrapperCol={layout === 'horizontal' ? horizontalWrapperCol : undefined}
    >
      <Form.Item label="布局方式">
        <Radio.Group onChange={setLayout} type="button" name="layout" value={layout}>
          <Radio value="horizontal">水平</Radio>
          <Radio value="vertical">垂直</Radio>
          <Radio value="inline">行内</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="输入框" field="input" tooltip={<div>输入框必填</div>} rules={[{ required: true }]}>
        <Input placeholder="请输入内容" />
      </Form.Item>
      <Form.Item label="输入框">
        <Input placeholder="请输入内容" />
      </Form.Item>
      <Form.Item
        wrapperCol={
          layout === 'horizontal'
            ? horizontalNoLabelWrapperCol
            : {}
        }
      >
        <Checkbox>我已阅读门店配置说明</Checkbox>
      </Form.Item>
      <Form.Item
        wrapperCol={
          layout === 'horizontal'
            ? horizontalNoLabelWrapperCol
            : {}
        }
      >
        <Button type="primary" htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  );
}
