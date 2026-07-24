import React from 'react';
import { Space, TreeSelect } from '@sbux/starbucks-design-react';

export default class Demo extends React.Component {
  handleChange = (value) => {
    console.log(value);
    this.setState({
      value,
    });
  };
  filterTreeNode = (inputText, node) => {
    return node.props.title.toLowerCase().indexOf(inputText.toLowerCase()) > -1;
  };

  render() {
    const treeData = [
      {
        title: 'Trunk 0-0',
        value: 'Trunk 0-0',
        key: '0-0',
        children: [
          {
            title: 'Branch 0-0-1',
            value: 'Branch 0-0-1',
            key: '0-0-1',
            children: [
              {
                title: 'Leaf 0-0-1-1',
                value: 'Leaf 0-0-1-1',
                key: '0-0-1-1',
              },
              {
                title: 'Leaf 0-0-1-2',
                value: 'Leaf 0-0-1-2',
                key: '0-0-1-2',
              },
            ],
          },
        ],
      },
      {
        title: 'Trunk 0-1',
        value: 'Trunk 0-1',
        key: '0-1',
        children: [
          {
            title: 'Branch 0-1-1',
            value: 'Branch 0-1-1',
            key: '0-1-1',
            children: [
              {
                title: 'Leaf 0-1-1-0',
                value: 'Leaf 0-1-1-0',
                key: '0-1-1-0',
              },
            ],
          },
          {
            title: 'Branch 0-1-2',
            value: 'Branch 0-1-2',
            key: '0-1-2',
            children: [
              {
                title: 'Leaf 0-1-2-0',
                value: 'Leaf 0-1-2-0',
                key: '0-1-2-0',
              },
            ],
          },
        ],
      },
    ];

    return (
      <Space size="large">
        <TreeSelect
          showSearch={true}
          placeholder="Please select ..."
          allowClear={true}
          treeData={treeData}
          onChange={this.handleChange}
          treeProps={{
            onSelect: (v, n) => {
              console.log(n);
            },
          }}
          style={{ width: 300 }}
        />
        <TreeSelect
          showSearch={true}
          placeholder="Please select ..."
          allowClear={true}
          treeProps={{
            onSelect: (v, n) => {
              console.log(n);
            },
          }}
          treeData={treeData}
          filterTreeNode={this.filterTreeNode}
          onChange={this.handleChange}
          style={{ width: 300 }}
        />
      </Space>
    );
  }
}
