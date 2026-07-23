import { useState } from 'react';
import { Button, Tree } from '@sbux/starbucks-design-react';
import { IconPlus } from '@sbux/starbucks-design-react/icon';
import './custom-extra-node.css';

export default function Demo() {
  const generatorTreeNodes = (treeData) => {
    return treeData.map((item) => {
      const { children, key, ...rest } = item;
      return (
        <Tree.Node key={key} {...rest} dataRef={item}>
          {children ? generatorTreeNodes(item.children) : null}
        </Tree.Node>
      );
    });
  };

  const TreeData = [
    {
      title: 'Trunk',
      key: '0-0',
      children: [
        {
          title: 'Leaf',
          key: '0-0-1',
        },
        {
          title: 'Branch',
          key: '0-0-2',
          children: [
            {
              title: 'Leaf',
              key: '0-0-2-1',
            },
          ],
        },
      ],
    },
    {
      title: 'Trunk',
      key: '0-1',
      children: [
        {
          title: 'Branch',
          key: '0-1-1',
          children: [
            {
              title: 'Leaf',
              key: '0-1-1-1',
            },
            {
              title: 'Leaf',
              key: '0-1-1-2',
            },
          ],
        },
        {
          title: 'Leaf',
          key: '0-1-2',
        },
      ],
    },
  ];

  const [treeData, setTreeData] = useState(TreeData);
  return (
    <div className="tree-extra-demo" style={{ width: 500, padding: 2, overflow: 'auto' }}>
      <Tree
        blockNode
        checkable
        renderExtra={(node) => {
          return (
            <Button
              aria-label={`为 ${node.dataRef.title} 添加子节点`}
              className="tree-node-add-button"
              icon={<IconPlus />}
              shape="square"
              size="mini"
              type="text"
              onClick={(event) => {
                event.stopPropagation();
                const dataChildren = node.dataRef.children || [];
                dataChildren.push({
                  title: 'new tree node',
                  key: node._key + '-' + (dataChildren.length + 1),
                });
                node.dataRef.children = dataChildren;
                setTreeData([...treeData]);
              }}
            />
          );
        }}
      >
        {generatorTreeNodes(treeData)}
      </Tree>
    </div>
  );
}
