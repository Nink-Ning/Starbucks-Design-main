import React from 'react';
import { TreeSelect } from '@sbux/starbucks-design-react';
import { IconStar } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const treeData = [
    {
      key: 'east',
      title: '华东区',
      children: [
        {
          key: 'shanghai',
          title: '上海市',
        },
      ],
    },
    {
      key: 'south',
      title: '华南区',
      children: [
        {
          key: 'guangdong',
          title: '广东省',
        },
        {
          key: 'fujian',
          title: '福建省',
        },
      ],
    },
  ];

  const [value, setValue] = React.useState('shanghai');

  return (
    <TreeSelect
      renderFormat={(nodeProps, value) => {
        return <span><IconStar /> {nodeProps?.title || value}</span>;
      }}
      treeData={treeData}
      value={value}
      onChange={(v) => {
        setValue(v);
      }}
      style={{ width: 300 }}
    />
  )
}
