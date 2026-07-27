import React from 'react';
import { Cascader, Space } from '@sbux/starbucks-design-react';

export default class Demo extends React.Component {
  loadMore = (pathValue, level) =>
    new Promise((resolve) => {
      setTimeout(() => {
        const nodes = pathValue.map((x, i) => ({
          label: `Option ${i + 1}`,
          value: i,
          isLeaf: level >= 2,
        }));
        resolve(nodes);
      }, 500);
    });

  render() {
    const options = [
      {
        value: 'beijing',
        label: 'Beijing',
      },
      {
        value: 'shanghai',
        label: 'Shanghai',
        children: [
          {
            value: 'shanghaishi',
            label: 'Shanghai',
          },
        ],
      },
    ];

    return (
      <Space size="large">
        <Cascader
          placeholder="Please select ..."
          style={{ width: 300, marginBottom: 20 }}
          options={options}
          loadMore={this.loadMore}
          showSearch
          allowClear
        />
        <Cascader
          placeholder="Please select ..."
          style={{ width: 300, marginBottom: 20 }}
          options={options}
          loadMore={this.loadMore}
          showSearch
          allowClear
          mode="multiple"
        />
      </Space>
    );
  }
}
