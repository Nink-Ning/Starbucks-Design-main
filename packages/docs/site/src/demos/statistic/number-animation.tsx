import React from 'react';
import { Button, Grid, Statistic } from '@sbux/starbucks-design-react';
import { IconArrowRise, IconArrowFall } from '@sbux/starbucks-design-react/icon';

export default class Demo extends React.Component {
  render() {
    return (
      <Grid.Row>
        <Grid.Col span={4}>
          <Statistic
            ref={(ref) => (this.refGrowth = ref)}
            title="User Growth Rate"
            value={50.32}
            precision={2}
            prefix={<IconArrowRise />}
            suffix="%"
            countUp
            styleValue={{ color: '#0fbf60' }}
          />
          <Button
            onClick={() => {
              this.refGrowth.countUp();
            }}
            style={{ display: 'block', marginTop: 10 }}
            type="primary"
          >
            Start
          </Button>
        </Grid.Col>
        <Grid.Col span={4}>
          <Statistic
            ref={(ref) => (this.refBugs = ref)}
            title="Population Growth Rate"
            value={2.59}
            precision={2}
            prefix={<IconArrowFall />}
            suffix="%"
            countUp
            styleValue={{ color: '#ee4d38' }}
          />
          <Button
            onClick={() => {
              this.refBugs.countUp();
            }}
            style={{ display: 'block', marginTop: 10 }}
            type="primary"
          >
            Start
          </Button>
        </Grid.Col>
      </Grid.Row>
    );
  }
}
