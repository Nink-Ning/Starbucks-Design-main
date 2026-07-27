import { Tree } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Tree blockNode>
      <Tree.Node title="Trunk 0-0" key="0-0">
        <Tree.Node title="Branch 0-0-0" key="0-0-0" disabled>
          <Tree.Node title="Leaf 0-0-0-0" key="0-0-0-0" />
          <Tree.Node title="Leaf 0-0-0-1" key="0-0-0-1" />
        </Tree.Node>
        <Tree.Node title="Branch 0-0-1" key="0-0-1">
          <Tree.Node title="Leaf 0-0-1-0" key="0-0-1-0" />
        </Tree.Node>
      </Tree.Node>
    </Tree>
  );
}
