import { Tree } from '@sbux/starbucks-design-react';
import { IconDown, IconDragArrow, IconDriveFile } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Tree
      icons={{
        switcherIcon: <IconDown />,
        dragIcon: <IconDragArrow />,
      }}
      showLine
      draggable
    >
      <Tree.Node key="node1" title="Trunk">
        <Tree.Node key="node2" title="Leaf" />
      </Tree.Node>
      <Tree.Node key="node3" title="Trunk">
        <Tree.Node
          key="node4"
          icons={{
            switcherIcon: <IconDriveFile />,
          }}
          title="Leaf"
        />
        <Tree.Node
          key="node5"
          icons={{
            switcherIcon: <IconDriveFile />,
          }}
          title="Leaf"
        />
      </Tree.Node>
    </Tree>
  );
}
