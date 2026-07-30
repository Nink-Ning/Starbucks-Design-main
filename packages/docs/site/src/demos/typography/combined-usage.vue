<template>
  <Typography :style="{ marginTop: '-40px' }">
    <TypographyTitle> Starbucks Design </TypographyTitle>
    <TypographyParagraph>
      Starbucks Design 用于沉淀品牌体验、组件资产和业务语境，让门店运营、会员增长和数字化触点保持一致的表达。
    </TypographyParagraph>
    <TypographyParagraph>
      组件示例会优先使用真实业务语义，帮助设计、开发和内容同学在同一套
      <TypographyText bold>品牌语言</TypographyText>
      下协作。
    </TypographyParagraph>
    <TypographyTitle :heading="2">Starbucks DesignKit</TypographyTitle>
    <TypographyParagraph>
      Starbucks DesignKit 基于品牌色、圆角、字号和间距变量进行封装，支持按业务场景
      <TypographyText mark>组合</TypographyText>
      并
      <TypographyText underline>复用</TypographyText>
      组件能力。
    </TypographyParagraph>
    <TypographyParagraph blockquote>
      设计规范需要连接
      <TypographyText code>design token</TypographyText>、
      <TypographyText code>component</TypographyText>
      和
      <TypographyText code>business context</TypographyText>
      ，确保体验从设计稿到交付链路稳定落地。
    </TypographyParagraph>
    <TypographyParagraph mark underline delete
      >旧版示例文案会逐步替换为 Starbucks 业务语境。</TypographyParagraph
    >
    <TypographyParagraph>
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
    </TypographyParagraph>
    <TypographyParagraph>
      <ol>
        <li>定义品牌变量</li>
        <li>复用基础组件</li>
        <li>完成业务交付</li>
      </ol>
    </TypographyParagraph>
  </Typography>
</template>
