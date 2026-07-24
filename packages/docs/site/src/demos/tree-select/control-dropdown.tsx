import React from 'react';
import { TreeSelect } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [visible, setVisible] = React.useState(false);
  return (
    <TreeSelect
      placeholder="hover to show options"
      popupVisible={visible}
      onVisibleChange={setVisible}
      triggerProps={{
        trigger: 'hover',
      }}
      style={{ width: 300 }}
      allowClear
    >
      <TreeSelect.Node key="node1" title="Trunk">
        <TreeSelect.Node key="node2" title="Leaf" />
      </TreeSelect.Node>
      <TreeSelect.Node key="node3" title="Trunk2">
        <TreeSelect.Node key="node4" title="Leaf" />
        <TreeSelect.Node key="node5" title="Leaf" />
      </TreeSelect.Node>
    </TreeSelect>
  );
}
