import React from 'react';
import { Timeline, Typography, Switch } from '@sbux/starbucks-design-react';

export default class Demo extends React.Component {
  state = {
    reverse: false,
  };

  render() {
    const { reverse } = this.state;
    return (
      <div>
        <div
          style={{ marginBottom: 40, }}
        >
          <Typography.Text style={{ verticalAlign: 'middle', marginRight: 8, }} >
            Reverse
          </Typography.Text>
          <Switch
            style={{ verticalAlign: 'middle', }}
            size="small"
            checked={reverse}
            onChange={() => {
              this.setState({
                reverse: !this.state.reverse,
              });
            }}
          />
        </div>
        <Timeline reverse={this.state.reverse}>
          <Timeline.Item label="2017-03-10">The first milestone</Timeline.Item>
          <Timeline.Item label="2018-05-12">The second milestone</Timeline.Item>
          <Timeline.Item label="2020-09-30">The third milestone</Timeline.Item>
        </Timeline>
      </div>
    );
  }
}
