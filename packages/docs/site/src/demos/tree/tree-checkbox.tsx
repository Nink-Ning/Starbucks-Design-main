import { useState } from 'react';
import { Checkbox, Tree } from '@sbux/starbucks-design-react';

export default function Demo() {
  const TreeData = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Leaf',
          key: '0-0-1',
        },
        {
          title: 'Branch 0-0-2',
          key: '0-0-2',
          disabled: true,
          children: [
            {
              title: 'Leaf',
              key: '0-0-2-1',
            },
            {
              title: 'Leaf',
              key: '0-0-2-2',
              disableCheckbox: true,
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
              title: 'Leaf ',
              key: '0-1-1-1',
            },
            {
              title: 'Leaf ',
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

  const [checkedKeys, setCheckedKeys] = useState(['0-0', '0-1']);
  const [checkStrictly, setCheckStrictly] = useState(false);
  return (
    <div>
      <Checkbox
        style={{ marginBottom: 24 }}
        onChange={(value) => {
          setCheckStrictly(value);
          setCheckedKeys([]);
        }}
      >
        checkStrictly
      </Checkbox>

      <Tree
        checkStrictly={checkStrictly}
        checkable
        checkedKeys={checkedKeys}
        onCheck={(value, extra) => {
          setCheckedKeys(value);
        }}
        treeData={TreeData}
      ></Tree>
    </div>
  );
}
