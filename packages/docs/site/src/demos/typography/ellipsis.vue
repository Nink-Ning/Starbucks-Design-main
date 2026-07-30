<template>
  <div>
    <TypographyTitle :heading="4" ellipsis>
      Starbucks DesignKit 将组件资产、品牌变量和业务语义沉淀为可复用的设计能力。
    </TypographyTitle>
    <TypographyParagraph
      :ellipsis="{
        rows: 2,
        showTooltip: true,
      }"
    >
      Starbucks Design 将企业设计语言、业务知识、工程资产和设计决策连接成一条稳定链路。组件示例会覆盖门店运营、会员增长、营销活动和交付协作等典型场景，帮助团队在同一套品牌规范下快速完成设计与研发交付。
    </TypographyParagraph>
    <TypographyParagraph
      :ellipsis="{
        rows: 2,
        showTooltip: true,
        css: true,
      }"
    >
      长文本内容在卡片、列表和说明区域中经常出现，因此需要通过省略能力保证页面结构稳定，并在需要时提供展开查看完整内容的操作。
    </TypographyParagraph>
    <TypographyParagraph
      :ellipsis="{
        suffix: '--Starbucks Design',
        rows: 2,
        expandable: true,
        showTooltip: {
          type: 'popover',
          props: {
            style: { maxWidth: `500px` },
          },
        },
      }"
    >
      <template #expand-node="{ expanded }">
        {{ expanded ? '' : '更多' }}
      </template>
      在门店运营看板中，说明文案可能包含指标口径、数据更新时间、异常处理建议和协作人信息。省略能力可以让页面保持紧凑，同时保留查看完整信息的入口。
    </TypographyParagraph>
    <TypographyParagraph
      :ellipsis="{
        suffix: '--Starbucks Design',
        rows: 3,
        expandable: true,
      }"
    >
      设计规范、组件来源、验收记录和质量检查结果会随交付链路同步沉淀。通过统一的排版规则，页面内容可以在不同业务模块中保持一致的阅读体验。
    </TypographyParagraph>
  </div>
</template>
