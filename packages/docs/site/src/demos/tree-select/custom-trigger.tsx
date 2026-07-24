import { useState } from 'react';
import { Link, TreeSelect, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [text, setText] = useState('node1');
  return (
    <TreeSelect
      allowClear
      onChange={(value) => {
        setText(value.label);
      }}
      labelInValue
      triggerElement={
        <Typography.Paragraph style={{ width: '300px' }}>
          You selected: <Link>{text}</Link>
        </Typography.Paragraph>
      }
    >
      <TreeSelect.Node key="node1" title="Trunk">
        <TreeSelect.Node key="node2" title="Leaf" />
      </TreeSelect.Node>
      <TreeSelect.Node key="node3" title="Trunk2">
        <TreeSelect.Node key="node4" title="Leaf" />
        <TreeSelect.Node key="node5" title="Leaf">
          <TreeSelect.Node key="node6" title="Leaf" />
          <TreeSelect.Node key="node7" title="Leaf" />
        </TreeSelect.Node>
      </TreeSelect.Node>
    </TreeSelect>
  );
}
