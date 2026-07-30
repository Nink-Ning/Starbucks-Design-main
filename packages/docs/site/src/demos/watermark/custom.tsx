import { useState, useMemo } from 'react';
import {
  Watermark,
  Typography,
  Form,
  Input,
  Radio,
  ColorPicker,
  Slider,
  Space,
  InputNumber
} from '@sbux/starbucks-design-react';

export default function Demo() {
  const defaultValue = {
    content: 'Starbucks DesignKit',
    gapsX: 100,
    gapsY: 100,
    offsetX: undefined,
    offsetY: undefined,
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    color: 'rgba(0,120,84,0.12)',
    rotate: 30,
    zIndex: 1
  };
  const [form] = Form.useForm();

  const [config, setConfig] = useState(defaultValue);

  const wmProps = useMemo(() => {
    const { content, gapsX, gapsY, offsetX, offsetY, rotate, fontSize, fontWeight, fontFamily, color, zIndex } = config;
    return {
      content,
      rotate,
      gap: [gapsX, gapsY],
      offset: [offsetX, offsetY],
      fontStyle: {
        color,
        fontSize: fontSize + 'px',
        fontFamily,
        fontWeight
      },
      zIndex
    };
  }, [config]);

  return (
    <div
      style={{
        color: 'var(--color-text-2)',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(220px, 264px)',
        gap: 24,
        alignItems: 'stretch',
        width: '100%'
      }}
    >
      <Watermark {...wmProps}>
        <div style={{ minWidth: 0 }}>
          <Typography.Title heading={2}>让设计经验，成为 AI 可执行的组织能力</Typography.Title>
          <Typography.Text bold>DesignKit</Typography.Text> 将企业设计语言、业务知识、工程资产和设计决策连接成一条智能生成链路。
          <ul style={{ listStyleType: 'circle', paddingLeft: 20 }}>
            <li>
              设计规范、业务语义与组件资产被结构化沉淀，帮助产品、设计、研发在统一标准下协作。
            </li>
            <li>
              生成流程以证据为基础，把页面骨架、组件来源、质量检查和交付结果串联起来。
            </li>
          </ul>
          <Typography.Title heading={2}>DesignKit Runtime</Typography.Title>
          <div
            style={{
              width: '100%',
              maxWidth: 600,
              boxSizing: 'border-box',
              padding: 24,
              marginBottom: 24,
              borderRadius: 12,
              border: '1px solid var(--color-border-2)',
              background:
                'linear-gradient(135deg, rgba(0, 120, 84, 0.14), rgba(0, 120, 84, 0.04))',
              position: 'relative',
              zIndex: 50
            }}
          >
            {[
              ['01', 'Design Spec', '需求结构与验收条件已加载', 'LOADED'],
              ['02', 'Domain Context', '企业业务语义与规则已匹配', 'MATCHED'],
              ['03', 'Template + Components', '页面骨架与现有资产已解析', 'RESOLVED'],
              ['04', 'Evaluator', '结构、视觉、行为与规则检查就绪', 'READY']
            ].map(([index, title, desc, status]) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                  marginBottom: 12,
                  borderRadius: 8,
                  border: '1px solid rgba(0, 120, 84, 0.18)',
                  background: 'rgba(255, 255, 255, 0.72)'
                }}
              >
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary)',
                    background: 'var(--color-primary-light)',
                    fontWeight: 700
                  }}
                >
                  {index}
                </span>
                <span style={{ flex: 1 }}>
                  <Typography.Text bold>{title}</Typography.Text>
                  <br />
                  <Typography.Text type="secondary">{desc}</Typography.Text>
                </span>
                <Typography.Text style={{ color: 'var(--color-primary)' }} bold>
                  {status}
                </Typography.Text>
              </div>
            ))}
          </div>
          <Typography.Title heading={3}>不是让 AI 随机拼装页面，而是让 AI 在企业标准内工作</Typography.Title>
          企业设计资产、业务模式与模板、Design Skill、工程组件复用、质量评估闭环。
          <ul style={{ listStyleType: 'circle', paddingLeft: 20 }}>
            <li>
              产品需求先转化为可验证的设计规格，再映射到稳定的组件和页面模板。
            </li>
            <li>
              组件来源保持可追溯，交付日期、资产状态和规则检查都能被记录。
            </li>
            <li>
              输出结果以 evidence-based 为原则，避免脱离品牌、业务和工程约束。
            </li>
          </ul>
        </div>
      </Watermark>
      <Form
        form={form}
        layout="vertical"
        style={{
          width: '100%',
          minWidth: 0,
          borderLeft: '1px solid var(--color-border-2)',
          paddingLeft: 24
        }}
        onValuesChange={() => {
          setConfig(form.getFieldsValue());
        }}
      >
        <Form.Item label="内容" field="content" initialValue={defaultValue.content}>
          <Input />
        </Form.Item>
        <Form.Item label="字重" field="fontWeight" initialValue={defaultValue.fontWeight}>
          <Radio.Group options={['lighter', 'normal', 'bold']} />
        </Form.Item>
        <Form.Item label="字族" field="fontFamily" initialValue={defaultValue.fontFamily}>
          <Radio.Group options={['sans-serif', 'serif']} />
        </Form.Item>
        <Form.Item label="颜色" field="color" initialValue={defaultValue.color}>
          <ColorPicker showText />
        </Form.Item>
        <Form.Item label="字体大小" field="fontSize" initialValue={defaultValue.fontSize}>
          <Slider min={12} max={100} />
        </Form.Item>
        <Form.Item label="旋转角度" field="rotate" initialValue={defaultValue.rotate}>
          <Slider min={-180} max={180} />
        </Form.Item>
        <Form.Item label="zIndex" field="zIndex" initialValue={defaultValue.zIndex}>
          <Slider min={-1} max={100} />
        </Form.Item>
        <Form.Item label="间距">
          <Space wrap>
            <Form.Item noStyle field="gapsX" initialValue={defaultValue.gapsX}>
              <InputNumber placeholder="水平间距" />
            </Form.Item>
            <Form.Item noStyle field="gapsY" initialValue={defaultValue.gapsY}>
              <InputNumber placeholder="竖直间距" />
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item label="偏移">
          <Space wrap>
            <Form.Item noStyle field="offsetX" initialValue={defaultValue.offsetX}>
              <InputNumber placeholder="水平偏移" />
            </Form.Item>

            <Form.Item noStyle field="offsetY" initialValue={defaultValue.offsetY}>
              <InputNumber placeholder="垂直偏移" />
            </Form.Item>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
