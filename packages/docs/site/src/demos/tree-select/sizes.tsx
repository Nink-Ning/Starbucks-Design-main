import { useState } from 'react';
import { Radio, TreeSelect } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [size, setSize] = useState('default');
  return (
    <div>
      <Radio.Group
        type="button"
        name="size"
        value={size}
        onChange={setSize}
        style={{ marginBottom: 20, }}
      >
        <Radio value="mini">mini</Radio>
        <Radio value="small">small</Radio>
        <Radio value="default">default</Radio>
        <Radio value="large">large</Radio>
      </Radio.Group>
      <div>
        <TreeSelect
          size={size}
          defaultValue="node1"
          style={{ width: 300, }}
        >
          <TreeSelect.Node key="node1" title="Trunk">
            <TreeSelect.Node key="node2" title="Leaf" />
          </TreeSelect.Node>
          <TreeSelect.Node key="node3" title="Trunk2">
            <TreeSelect.Node key="node4" title="Leaf" />
            <TreeSelect.Node key="node5" title="Leaf" />
          </TreeSelect.Node>
        </TreeSelect>
      </div>
    </div>
  );
}
