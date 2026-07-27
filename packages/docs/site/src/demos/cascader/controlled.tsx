import React from 'react';
import { Cascader, Space } from '@sbux/starbucks-design-react';

export default class Demo extends React.Component {
  state = {
    value: undefined,
    value1: undefined,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        value: [['beijing', 'Beijing', 'chaoyang', 'datunli']],
      });
    }, 200);
  }

  render() {
    const options = [
      {
        value: 'beijing',
        label: 'Beijing',
        children: [
          {
            value: 'Beijing',
            label: 'Beijing',
            children: [
              {
                value: 'chaoyang',
                label: 'Chaoyang',
                children: [
                  {
                    value: 'datunli',
                    label: 'Datunli',
                  },
                ],
              },
              {
                value: 'dongcheng',
                label: 'Dongcheng',
              },
              {
                value: 'xicheng',
                label: 'Xicheng',
              },
              {
                value: 'haidian',
                label: 'Haidian',
              },
            ],
          },
        ],
      },
      {
        value: 'shanghai',
        label: 'Shanghai',
        children: [
          {
            value: 'shanghaishi',
            label: 'Shanghai',
            children: [
              {
                value: 'huangpu',
                label: 'Huangpu',
              },
            ],
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
          showSearch
          value={this.state.value1}
          onChange={(value, option) => {
            console.log(option);
            this.setState({
              value1: value,
            });
          }}
        ></Cascader>
        <Cascader
          placeholder="Please select ..."
          style={{ width: 300, marginBottom: 20 }}
          options={options}
          showSearch
          mode="multiple"
          value={this.state.value}
          onChange={(value, options) => {
            console.log(value, options);
            this.setState({
              value,
            });
          }}
        />
      </Space>
    );
  }
}
