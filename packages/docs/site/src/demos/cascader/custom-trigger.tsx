import React from 'react';
import { Cascader, Typography, Input, Divider, Link } from '@sbux/starbucks-design-react';

export default class Demo extends React.Component {
  state = {
    text: ['Shanghai', 'Shanghai', 'Huangpu'].join(', '),
    inputValue: '',
  };
  onChange = (value, selectedOptions) => {
    this.setState({
      text: selectedOptions.map((a) => a.label).join(', '),
    });
  };
  onInputValueChange = (inputValue) => {
    this.setState({
      inputValue,
    });
  };

  render() {
    const options = [
      {
        value: 'Beijing',
        label: 'Beijing',
        children: [
          {
            value: 'Beijing',
            label: 'Beijing',
            children: [
              {
                value: 'Chaoyang',
                label: 'Chaoyang',
                children: [
                  {
                    value: 'Datunli',
                    label: 'Datunli',
                  },
                ],
              },
              {
                value: 'Dongcheng',
                label: 'Dongcheng',
              },
              {
                value: 'Xicheng',
                label: 'Xicheng',
              },
              {
                value: 'Haidian',
                label: 'Haidian',
              },
            ],
          },
        ],
      },
      {
        value: 'Shanghai',
        label: 'Shanghai',
        children: [
          {
            value: 'Shanghai',
            label: 'Shanghai',
            children: [
              {
                value: 'Huangpu',
                label: 'Huangpu',
              },
            ],
          },
        ],
      },
    ];

    return (
      <div>
        <Typography.Text>City</Typography.Text>
        <Cascader
          defaultValue={['Shanghai', 'Shanghai', 'Huangpu']}
          placeholder="Please select ..."
          inputValue={this.state.inputValue}
          style={{ width: 300 }}
          options={options}
          onChange={this.onChange}
          dropdownRender={(menu) => {
            return (
              <div
                style={{ maxWidth: 'fit-content', minWidth: 120 }}
              >
                <div
                  style={{ padding: '6px 8px' }}
                >
                  <Input.Search
                    placeholder="Please select ..."
                    allowClear
                    onChange={this.onInputValueChange}
                    value={this.state.inputValue}
                  />
                </div>

                <Divider
                  style={{ margin: 0 }}
                />
                {menu}
              </div>
            );
          }}
        >
          <Link className="trigger-element" role="button" tabIndex={0}>{this.state.text}</Link>
        </Cascader>
      </div>
    );
  }
}
