import { Space, TreeSelect } from '@sbux/starbucks-design-react';

export default function Demo() {
  const treeData = [
    {
      key: 'node1',
      title: '华东区',
      disabled: true,
      children: [
        {
          key: 'node2',
          title: '上海市',
        },
      ],
    },
    {
      key: 'node3',
      title: '华南区',
      children: [
        {
          key: 'node4',
          title: '广东省',
        },
        {
          key: 'node5',
          title: '福建省',
        },
      ],
    },
  ];

  return (
    <Space size={16}>
      <TreeSelect addBefore="区域" treeData={treeData} style={{ width: 300 }} />
      <TreeSelect addBefore="区域" treeData={treeData} treeCheckable style={{ width: 300 }} />
    </Space>
  );
}
