import { useState } from 'react';
import { Typography } from '@sbux/starbucks-design-react';
import { IconDoubleDown, IconDoubleUp } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const text =
    'Starbucks Design 将企业设计语言、业务知识、工程资产和设计决策连接成一条稳定链路。组件示例覆盖门店运营、会员增长、营销活动和交付协作等典型场景，帮助团队在同一套品牌规范下快速完成设计与研发交付。长文本内容在卡片、列表和说明区域中经常出现，因此需要通过省略能力保证页面结构稳定，并在需要时提供展开查看完整内容的操作。';

  const [expanded, setExpanded] = useState(true);

  const expandRender = (expanded) => {
    if (!expanded) {
      return <IconDoubleDown className="action-btn" />;
    }
    return <IconDoubleUp className="action-btn" />;
  };

  return (
    <div>
      <Typography.Ellipsis rows={4} expanded={expanded} expandRender={expandRender} onExpand={setExpanded}>
        {text}
      </Typography.Ellipsis>
    </div>
  );
}
