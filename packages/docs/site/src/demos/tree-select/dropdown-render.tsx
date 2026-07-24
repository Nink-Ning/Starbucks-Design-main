import { useState } from 'react';
import { Button, Divider, Input, TreeSelect } from '@sbux/starbucks-design-react';
import { IconPlus } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const defaultTreeData = [
    {
      key: 'node1',
      title: 'Trunk',
      disabled: true,
      children: [
        {
          key: 'node2',
          title: 'Leaf',
        },
      ],
    },
    {
      key: 'node3',
      title: 'Trunk2',
      children: [
        {
          key: 'node4',
          title: 'Leaf',
        },
        {
          key: 'node5',
          title: 'Leaf',
        },
      ],
    },
  ];

  const [treeData, setTreeData] = useState(defaultTreeData);
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    setTreeData([
      ...treeData,
      {
        key: inputValue,
        title: inputValue,
      },
    ]);
  };

  return (
    <TreeSelect
      placeholder="Please select ..."
      treeData={treeData}
      style={{ width: 300 }}
      allowClear
      dropdownMenuStyle={{
        maxHeight: 250,
        display: 'flex',
        flexDirection: 'column',
      }}
      dropdownRender={(menu) => (
        <>
          <div style={{ flex: 1, overflow: 'auto' }}>{menu}</div>
          <div>
            <Divider style={{ margin: 0 }} />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 12px',
              }}
            >
              <Input
                size="small"
                style={{ marginRight: 18 }}
                value={inputValue}
                onChange={(value) => setInputValue(value)}
              />
              <Button
                style={{ fontSize: 14, padding: '0 6px' }}
                type="text"
                size="mini"
                onClick={addItem}
              >
                <IconPlus />
                Add item
              </Button>
            </div>
          </div>
        </>
      )}
    ></TreeSelect>
  );
}
