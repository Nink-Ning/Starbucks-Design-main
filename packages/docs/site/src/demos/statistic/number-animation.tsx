import React from 'react';
import { Button, Grid, Statistic } from '@sbux/starbucks-design-react';
import { IconArrowRise, IconArrowFall } from '@sbux/starbucks-design-react/icon';

export default class Demo extends React.Component {
  render() {
    return (
      <Grid.Row gutter={48}>
        <Grid.Col span={8}>
          <Statistic
            ref={(ref) => (this.refGrowth = ref)}
            title="User Growth Rate"
            value={50.32}
            precision={2}
            prefix={<IconArrowRise />}
            suffix="%"
            countUp
            styleValue={{ color: 'var(--color-success)' }}
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
        <Grid.Col span={8}>
          <Statistic
            ref={(ref) => (this.refBugs = ref)}
            title="Population Growth Rate"
            value={2.59}
            precision={2}
            prefix={<IconArrowFall />}
            suffix="%"
            countUp
            styleValue={{ color: 'var(--color-danger)' }}
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
