import { useState } from 'react';
import { Tree } from '@sbux/starbucks-design-react';

export default function Demo() {
  const TreeData = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Branch 0-0-2',
          key: '0-0-2',
          selectable: false,
          children: [
            {
              title: 'Leaf',
              key: '0-0-2-1',
              children: [
                {
                  title: 'Leafsss 0-0-2',
                  key: '0-0-2-1-0',
                  children: [
                    {
                      title: 'Leaf',
                      key: '0-0-2-1-0-0',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Trunk 0-1',
      key: '0-1',
      children: [
        {
          title: 'Branch 0-1-1',
          key: '0-1-1',
          children: [
            {
              title: 'Leaf',
              key: '0-1-1-0',
            },
          ],
        },
      ],
    },
  ];

  const [treeData, setTreeData] = useState(TreeData);
  return (
    <div>
      <Tree defaultSelectedKeys={['0-0-1']} treeData={treeData}></Tree>
    </div>
  );
}
