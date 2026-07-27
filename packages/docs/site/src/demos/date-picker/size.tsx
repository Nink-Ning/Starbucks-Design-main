import React from 'react';
import { DatePicker, Radio } from '@sbux/starbucks-design-react';

export default class Demo extends React.Component {
  state = {
    size: 'default',
  };
  handleChange = (size) => {
    this.setState({
      size,
    });
  };

  render() {
    const { size } = this.state;
    return (
      <div>
        <Radio.Group
          type="button"
          mode="fill"
          name="size"
          value={this.state.size}
          onChange={this.handleChange}
          style={{ marginBottom: 20 }}
        >
          {['mini', 'small', 'default', 'large'].map((x) => {
            return (
              <Radio key={x} value={x}>
                {x}
              </Radio>
            );
          })}
        </Radio.Group>
        <br />
        <DatePicker
          size={size}
          style={{ width: 254 }}
        />
      </div>
    );
  }
}
