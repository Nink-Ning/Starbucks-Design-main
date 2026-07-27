import React from 'react';
import { Radio, Tree } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [size, setSize] = React.useState('default');
  return (
    <div>
      <Radio.Group
        options={['mini', 'small', 'default', 'large']}
        type="button"
        value={size}
        onChange={setSize}
        style={{ marginBottom: 20 }}
      ></Radio.Group>
      <Tree blockNode style={{ marginRight: 20 }} checkable size={size}>
        <Tree.Node title="Trunk 0-0" key="0-0">
          <Tree.Node title="Branch 0-0-0" key="0-0-0" disabled>
            <Tree.Node title="Leaf" key="0-0-0-0" />
            <Tree.Node title="Leaf" key="0-0-0-1" />
          </Tree.Node>
          <Tree.Node title="Branch 0-0-1" key="0-0-1">
            <Tree.Node title="Leaf" key="0-0-1-0" />
          </Tree.Node>
        </Tree.Node>
      </Tree>
    </div>
  );
}
