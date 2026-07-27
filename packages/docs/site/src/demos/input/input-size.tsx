import React from 'react';
import { Input, Radio, Select, Slider, Typography } from '@sbux/starbucks-design-react';
import { IconClockCircle, IconInfoCircle, IconSearch } from '@sbux/starbucks-design-react/icon';

export default class Demo extends React.Component {
  state = {
    size: 'default',
    height: 0,
  };
  handleHeightChange = (height) => {
    this.setState({
      height,
    });
  };
  handleChange = (size) => {
    this.setState({
      height: undefined,
      size,
    });
  };

  render() {
    const { size, height } = this.state;
    const props = {
      size,
    };

    if (height) {
      props.height = height;
    }

    return (
      <div>
        <Radio.Group
          type="button"
          mode="fill"
          name="size"
          value={this.state.size}
          onChange={this.handleChange}
          style={{ marginBottom: 24 }}
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
        <Typography.Text>Custom height</Typography.Text>
        <Slider
          value={this.state.height}
          onChange={this.handleHeightChange}
          max={60}
          min={24}
          style={{ width: 180, margin: '0 0 20px 20px' }}
        />
        <div>
          <Input
            {...props}
            style={{ width: 350, margin: 12 }}
            prefix={<IconClockCircle />}
            placeholder="Enter something"
          />
          <Input
            {...props}
             style={{ width: 350, margin: 12 }}
            suffix={<IconInfoCircle />}
            placeholder="Enter something"
          />
        </div>
        <div>
          <Input
            {...props}
            style={{ width: 350, margin: 12 }}
            addAfter="KG"
            placeholder="Enter something"
          />
          <Input
            {...props}
            style={{ width: 350, margin: 12 }}
            addBefore="+86"
            placeholder="Enter phone number"
          />
        </div>
        <div>
          <Input
            {...props}
            style={{ width: 350, margin: 12 }}
            addBefore="+86"
            addAfter={<IconSearch />}
            prefix={<IconClockCircle />}
            suffix={<IconInfoCircle />}
            allowClear
            placeholder="Enter phone number"
          />
          <Input.Search
            {...props}
            placeholder="Enter something"
            style={{ width: 350, margin: 12 }}
            searchButton={true}
          />
        </div>
        <div>
          <Input
            {...props}
            style={{ width: 350, margin: 12 }}
            addBefore={
              <Select size={size} placeholder="Select protocol" style={{ width: 100 }}>
                <Select.Option value="http://">http://</Select.Option>
                <Select.Option value="https://">https://</Select.Option>
              </Select>
            }
            allowClear={true}
            placeholder="Enter something"
          />
          <Input
            {...props}
            style={{ width: 350, margin: 12 }}
            allowClear={true}
            placeholder="Enter something"
          />
        </div>
      </div>
    );
  }
}
