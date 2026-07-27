import { Tree } from '@sbux/starbucks-design-react';
import { IconStar } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Tree>
      <Tree.Node icon={<IconStar />} key="node1" title="Trunk">
        <Tree.Node icon={<IconStar />} key="node2" title="Leaf" />
      </Tree.Node>
      <Tree.Node icon={<IconStar />} key="node3" title="Trunk">
        <Tree.Node icon={<IconStar />} key="node4" title="Leaf" />
        <Tree.Node icon={<IconStar />} key="node5" title="Leaf" />
      </Tree.Node>
    </Tree>
  );
}
