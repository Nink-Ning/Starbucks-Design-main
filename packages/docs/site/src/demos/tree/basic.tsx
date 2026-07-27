import { Tree } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Tree
      defaultExpandedKeys={['0-0-0']}
      defaultSelectedKeys={['0-0-0', '0-0-1']}
      onSelect={(value, info) => {
        console.log(value, info);
      }}
      onExpand={(keys, info) => {
        console.log(keys, info);
      }}
    >
      <Tree.Node title="Trunk" key="0-0">
        <Tree.Node title="Branch 0-0-0" key="0-0-0" disabled>
          <Tree.Node title="Leaf" key="0-0-0-0" />
          <Tree.Node title="Leaf" key="0-0-0-1" />
        </Tree.Node>
        <Tree.Node title="Branch 0-0-1" key="0-0-1">
          <Tree.Node title="Leaf" key="0-0-1-0" />
        </Tree.Node>
      </Tree.Node>
    </Tree>
  );
}
