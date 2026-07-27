import React from 'react';
import { Collapse, Grid, Typography, Radio } from '@sbux/starbucks-design-react';
import { IconInfoCircle, IconSettings } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  const [position, setPosition] = React.useState('left');
  return (
    <div>
      <Grid.Row align="center" style={{ marginBottom: 24 }}>
        <Typography.Text>Position:</Typography.Text>
        <Radio.Group
          style={{ marginLeft: 20 }}
          value={position}
          onChange={setPosition}
          options={[
            {
              label: 'hide',
              value: ''
            },
            {
              label: 'left',
              value: 'left'
            },
            {
              label: 'right',
              value: 'right'
            }
          ]}
        />
      </Grid.Row>

      <Collapse
        {...(position
          ? {
              expandIconPosition: position
            }
          : {
              expandIcon: null
            })}
        style={{ maxWidth: 1180 }}
      >
        <Collapse.Item header="Beijing Toutiao Technology Co., Ltd." name="1" extra={<IconInfoCircle />}>
          Beijing Toutiao Technology Co., Ltd.
        </Collapse.Item>

        <Collapse.Item header="Introduce" name="2" extra={<IconSettings />}>
          ByteDance's core product, Toutiao ("Headlines"), is a content platform in China and around the world. Toutiao
          started out as a news recommendation engine and gradually evolved into a platform delivering content in
          various formats, such as texts, images, question-and-answer posts, microblogs, and videos.
        </Collapse.Item>

        <Collapse.Item header="The Underlying AI Technology" name="3">
          In 2016, ByteDance's AI Lab and Peking University co-developed Xiaomingbot (张小明), an artificial
          intelligence bot that writes news articles. The bot published 450 articles during the 15-day 2016 Summer
          Olympics in Rio de Janeiro. In general, Xiaomingbot published stories approximately two seconds after the
          event ended.
        </Collapse.Item>
      </Collapse>
    </div>
  );
}
