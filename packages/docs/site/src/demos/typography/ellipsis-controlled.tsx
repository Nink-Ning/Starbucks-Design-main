import { useState } from 'react';
import { Button, Descriptions, Form, Input, Space, Switch, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const defaultText = `Starbucks Design 将企业设计语言、业务知识、工程资产和设计决策连接成一条稳定链路。
组件示例覆盖门店运营、会员增长、营销活动和交付协作等典型场景，帮助团队在同一套品牌规范下快速完成设计与研发交付。`;
  const defaultConfig = {
    ellipsisStr: '...'
  };

  const [config, setConfig] = useState(defaultConfig);
  const [rows, setRows] = useState(1);
  const [text, setText] = useState(defaultText);
  const { ellipsis, ellipsisStr, expandable, suffix } = config;
  return (
    <div>
      <Space align="start" size={120}>
        <Form
          onValuesChange={(_, values) => setConfig(values)}
          style={{ width: '400px' }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          size="small"
        >
          <Form.Item label="超出省略" field="ellipsis" triggerPropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="展开/折叠" field="expandable" triggerPropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="省略号" field="ellipsisStr" initialValue={defaultConfig.ellipsisStr}>
            <Input />
          </Form.Item>
          <Form.Item label="suffix" field="suffix">
            <Input />
          </Form.Item>
          <Form.Item label="省略展示">
            <Space size="medium">
              <Button onClick={() => setRows(Math.max(1, rows - 1))}> row- </Button>
              <Button onClick={() => setRows(rows + 1)}> row+ </Button>
            </Space>
          </Form.Item>
          <Form.Item label="文字操作">
            <Button onClick={() => setText(text + defaultText)} type="primary">
              addText
            </Button>
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

      <div>
        <Typography.Paragraph
          ellipsis={
            ellipsis
              ? {
                  rows: rows,
                  expandable,
                  suffix,
                  ellipsisStr,
                  wrapper: 'div'
                }
              : undefined
          }
        >
          {text}
        </Typography.Paragraph>
      </div>
    </div>
  );
}
