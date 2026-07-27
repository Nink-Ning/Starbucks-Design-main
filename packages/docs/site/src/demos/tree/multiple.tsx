import { useState } from 'react';
import { Checkbox, Tree, Typography } from '@sbux/starbucks-design-react';

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
          disableCheckbox: true,
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
      title: 'Trunk 0-1',
      key: '0-1',
      children: [
        {
          title: 'Branch 0-1-1',
          key: '0-1-1',
          checkable: false,
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

  const [selectedKeys, setSelectedKeys] = useState([]);
  const [checked, setChecked] = useState(true);
  return (
    <div>
      <Checkbox
        style={{ marginBottom: 24 }}
        checked={checked}
        onChange={(value) => {
          setChecked(value);
          setSelectedKeys([]);
        }}
      >
        multiple
      </Checkbox>

      <br />
      <Typography.Text>Current: {selectedKeys.join(' , ')}</Typography.Text>
      <br />
      <Tree
        multiple={checked}
        selectedKeys={selectedKeys}
        onSelect={(value, extra) => {
          console.log(value, extra);
          setSelectedKeys(value);
        }}
        treeData={TreeData}
      ></Tree>
    </div>
  );
}
