import { Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const mockText =
    'Starbucks Design 将企业设计语言、业务知识、工程资产和设计决策连接成一条稳定链路。组件示例会覆盖门店运营、会员增长、营销活动和交付协作等典型场景，帮助团队在同一套品牌规范下快速完成设计与研发交付。长文本内容在卡片、列表和说明区域中经常出现，因此需要通过省略能力保证页面结构稳定，并在需要时提供展开查看完整内容的操作。';
  const mockTitle =
    ' Starbucks DesignKit 将组件资产、品牌变量和业务语义沉淀为可复用的设计能力。';

  return (
    <div>
      <Typography.Title heading={4} ellipsis={{ wrapper: 'span' }}>
        {mockTitle}
      </Typography.Title>
      <Typography.Paragraph ellipsis={{ rows: 2, showTooltip: true, expandable: true, wrapper: 'span' }}>
        {mockText}
      </Typography.Paragraph>
      <Typography.Paragraph ellipsis={{ suffix: '---Starbucks Design', wrapper: 'span' }}>{mockTitle}</Typography.Paragraph>
    </div>
  );
}
