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
          <Timeline.Item label="2026-03-10">春季拿铁配方确认</Timeline.Item>
          <Timeline.Item label="2026-05-12">门店冷萃物料到店</Timeline.Item>
          <Timeline.Item label="2026-09-30">秋季会员活动上线</Timeline.Item>
        </Timeline>
      </div>
    );
  }
}
