import { useState } from 'react';
import { Button, Descriptions, Form, Input, ResizeBox, Space, Switch, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const defaultText =
    'Starbucks Design 将企业设计语言、业务知识、工程资产和设计决策连接成一条稳定链路。组件示例覆盖门店运营、会员增长、营销活动和交付协作等典型场景，帮助团队在同一套品牌规范下快速完成设计与研发交付。长文本内容在卡片、列表和说明区域中经常出现，因此需要通过省略能力保证页面结构稳定，并在需要时提供展开查看完整内容的操作。';

  const [form] = Form.useForm();
  const [config, setConfig] = useState({
    disabled: false,
    expandable: true,
    expandableSingle: false,
    expanded: false,
    showTooltip: false
  });
  const [text, setText] = useState(defaultText);
  const [rows, setRows] = useState(1);

  return (
    <div>
      <Space align="start" size={120}>
        <Form
          form={form}
          initialValues={config}
          onValuesChange={(_, values) => setConfig(values)}
          style={{ width: '400px' }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          size="small"
        >
          <Form.Item label="展开/折叠" field="expanded" triggerPropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="省略提示" field="showTooltip" triggerPropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="展示操作按钮" field="expandable" triggerPropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="展示操作按钮（单行）" field="expandableSingle" triggerPropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="禁用省略" field="disabled" triggerPropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="省略展示">
            <Space size="medium">
              <Button onClick={() => setRows(Math.max(1, rows - 1))}>row-</Button>
              <Button onClick={() => setRows(rows + 1)}>row+</Button>
            </Space>
          </Form.Item>
          <Form.Item label="文字操作">
            <Input.TextArea value={text} onChange={setText} />
          </Form.Item>
        </Form>
        <Descriptions
          column={1}
          title="当前配置"
          data={[
            ...Object.entries(config).map(([label, value]) => ({
              label,
              value: String(value)
            })),
            {
              label: 'rows',
              value: rows
            }
          ]}
          style={{ marginBottom: 20 }}
          labelStyle={{ paddingRight: 36 }}
        />
      </Space>

      <ResizeBox
        directions={['right']}
        style={{
          width: 500,
          minWidth: 100
        }}
      >
        <Typography.Ellipsis
          rows={rows}
          {...config}
          expandable={config.expandableSingle ? { single: true } : config.expandable}
          onExpand={(v) =>
            form.setFieldsValue({
              expanded: v
            })
          }
        >
          {text}
        </Typography.Ellipsis>
      </ResizeBox>
    </div>
  );
}
