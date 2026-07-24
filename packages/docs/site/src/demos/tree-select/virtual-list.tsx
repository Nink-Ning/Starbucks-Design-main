import React from 'react';
import { TreeSelect } from '@sbux/starbucks-design-react';

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
      <TreeSelect
        treeData={treeData}
        treeProps={{
          height: 200,
          renderTitle: (props) => {
            return (
              <span style={{ whiteSpace: 'nowrap', }} >
                {props.title}
              </span>
            );
          },
        }}
      />
    </div>
  );
}
