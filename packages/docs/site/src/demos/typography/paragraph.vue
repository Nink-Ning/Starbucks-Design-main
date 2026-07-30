<template>
  <Typography>
    <TypographyTitle :heading="5">默认段落</TypographyTitle>
    <TypographyParagraph>
      Starbucks Design 将品牌色、字体、圆角和组件状态沉淀为统一规范。业务页面可以通过这些规范快速搭建门店运营、会员触达和活动管理等场景。
    </TypographyParagraph>
    <TypographyTitle :heading="5">辅助段落</TypographyTitle>
    <TypographyParagraph type="secondary">
      辅助文本用于解释页面信息、补充操作说明或承载低优先级内容。它需要保持清晰可读，同时避免抢占主要信息的视觉层级。
    </TypographyParagraph>
    <TypographyTitle :heading="5">默认行距</TypographyTitle>
    <TypographyParagraph>
      当段落内容较长时，默认行距能提供更稳定的阅读节奏。适用于说明文档、业务介绍、组件指南和页面级描述，让用户可以连续阅读多行文本。
    </TypographyParagraph>
    <TypographyTitle :heading="5">紧凑行距</TypographyTitle>
    <TypographyParagraph type="secondary" spacing="close">
      紧凑行距适合短说明，例如表单提示、卡片摘要或运营状态描述。
    </TypographyParagraph>
  </Typography>
</template>
