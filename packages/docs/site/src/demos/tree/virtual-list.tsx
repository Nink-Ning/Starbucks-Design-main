import React from 'react';
import { Button, Tree } from '@sbux/starbucks-design-react';

export default function Demo() {
  function loop(path = '0', level = 2) {
    const list = [];

    for (let i = 0; i < 10; i += 1) {
      const key = `${path}-${i}`;
      const treeNode = {
        title: key,
        key,
      };

      if (level > 0) {
        treeNode.children = loop(key, level - 1);
      }

      list.push(treeNode);
    }

    return list;
  }

  const treeData = loop();

  const treeRef = React.useRef();
  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: 20 }}
        onClick={() => {
          treeRef.current && treeRef.current.scrollIntoView('0-0-2-2');
        }}
      >
        Scroll to 0-0-2-2, i.e. the 26th.
      </Button>
      <Tree
        ref={treeRef}
        blockNode
        checkable
        treeData={treeData}
        virtualListProps={{ height: 200 }}
      />
    </div>
  );
}
