import { useState } from 'react';
import { Typography } from '@sbux/starbucks-design-react';
import { IconDoubleDown, IconDoubleUp } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const text =
    'A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design. A design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The verb to design expresses the process of developing a design. The verb to design expresses the process of developing a design.';

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
