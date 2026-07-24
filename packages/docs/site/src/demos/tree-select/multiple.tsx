import React from 'react';
import { Space, TreeSelect } from '@sbux/starbucks-design-react';

export default class Demo extends React.Component {
  state = {
    value: [],
  };
  handleChange = (value) => {
    console.log(value);
    this.setState({
      value,
    });
  };

  render() {
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
      <Space size="large">
        <TreeSelect
          allowClear
          placeholder="请选择区域"
          multiple
          showSearch
          treeData={treeData}
          value={this.state.value}
          onChange={this.handleChange}
          style={{ width: 300 }}
        />
        <TreeSelect
          allowClear
          placeholder="最多显示 2 个标签"
          multiple
          showSearch
          maxTagCount={2}
          treeData={treeData}
          value={this.state.value}
          onChange={this.handleChange}
          style={{ width: 300 }}
        />
      </Space>
    );
  }
}
