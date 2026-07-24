import { TreeSelect } from '@sbux/starbucks-design-react';
import { IconCalendar } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const treeData = [
    {
      key: 'node1',
      icon: <IconCalendar />,
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
      icon: <IconCalendar />,
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

  return <TreeSelect treeData={treeData} placeholder="请选择区域" style={{ width: 300 }} />;
}
