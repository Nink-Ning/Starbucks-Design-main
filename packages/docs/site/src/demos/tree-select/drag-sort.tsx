import { TreeSelect } from '@sbux/starbucks-design-react';

export default function Demo() {
  const treeData = [
    {
      key: 'node1',
      title: 'Trunk1',
      disabled: true,
      children: [
        {
          key: 'node2',
          title: 'Leaf1',
        },
      ],
    },
    {
      key: 'node3',
      title: 'Trunk2',
      children: [
        {
          key: 'node4',
          title: 'Leaf2',
        },
        {
          key: 'node5',
          title: 'Leaf3',
        },
      ],
    },
  ];

  return (
    <TreeSelect treeData={treeData} multiple dragToSort placeholder='请选择...' style={{ width: 300 }} />
  );
}
