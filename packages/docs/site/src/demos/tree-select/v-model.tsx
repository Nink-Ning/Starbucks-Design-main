import React, { useState } from 'react';
import { TreeSelect } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [value, setValue] = useState('shanghai');
  const treeData = [
    {
      key: 'east',
      title: '华东区',
      children: [
        {
          key: 'shanghai',
          title: '上海市',
        },
        {
          key: 'zhejiang',
          title: '浙江省',
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

  return (
    <TreeSelect
      treeData={treeData}
      value={value}
      onChange={setValue}
      placeholder="请选择区域"
      style={{ width: 300 }}
    />
  );
}
