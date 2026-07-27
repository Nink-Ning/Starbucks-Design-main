import React from 'react';
import { Cascader, Radio } from '@sbux/starbucks-design-react';

export default class Demo extends React.Component {
  state = {
    value: 'default',
  };

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
      <div>
        <Radio.Group
          type="button"
          name="size"
          value={this.state.value}
          onChange={(value) => {
            this.setState({
              value,
            });
          }}
          style={{ marginBottom: 20 }}
        >
          <Radio value="mini">mini</Radio>
          <Radio value="small">small</Radio>
          <Radio value="default">default</Radio>
          <Radio value="large">large</Radio>
        </Radio.Group>
        <div>
          <Cascader
            placeholder="Please select ..."
            style={{ width: 300, marginBottom: 20 }}
            options={options}
            size={this.state.value}
            allowClear
          />
          <br />
          <Cascader
            placeholder="Please select ..."
            style={{ width: 300 }}
            options={options}
            mode="multiple"
            size={this.state.value}
            allowClear
          />
        </div>
      </div>
    );
  }
}
