import { Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Typography style={{ marginTop: -40 }}>
      <Typography.Title>Starbucks Design</Typography.Title>
      <Typography.Paragraph>
        Starbucks Design 用于沉淀品牌体验、组件资产和业务语境，让门店运营、会员增长和数字化触点保持一致的表达。
      </Typography.Paragraph>
      <Typography.Paragraph>
        组件示例会优先使用真实业务语义，帮助设计、开发和内容同学在同一套
        <Typography.Text bold>品牌语言</Typography.Text>下协作。
      </Typography.Paragraph>
      <Typography.Title heading={2}>Starbucks DesignKit</Typography.Title>
      <Typography.Paragraph>
        Starbucks DesignKit 基于品牌色、圆角、字号和间距变量进行封装，支持按业务场景
        <Typography.Text mark>组合</Typography.Text>并<Typography.Text underline>复用</Typography.Text>组件能力。
      </Typography.Paragraph>
      <Typography.Paragraph blockquote>
        设计规范需要连接 <Typography.Text code>design token</Typography.Text>、<Typography.Text code>component</Typography.Text> 和
        <Typography.Text code>business context</Typography.Text>，确保体验从设计稿到交付链路稳定落地。
      </Typography.Paragraph>
      <Typography.Paragraph mark underline delete>
        旧版示例文案会逐步替换为 Starbucks 业务语境。
      </Typography.Paragraph>
      <Typography.Paragraph>
        <ul>
          <li>
            品牌体验规范
            <ul>
              <li>门店视觉与数字触点一致性</li>
            </ul>
          </li>
          <li>组件资产沉淀</li>
          <li>运营流程协作</li>
        </ul>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <ol>
          <li>定义品牌变量</li>
          <li>复用基础组件</li>
          <li>完成业务交付</li>
        </ol>
      </Typography.Paragraph>
    </Typography>
  );
}
