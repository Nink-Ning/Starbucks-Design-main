import { useState } from 'react';
import { Checkbox, Grid } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [value, setValue] = useState(['Option 1', 'Option 2']);
  return (
    <Checkbox.Group value={value} onChange={setValue}>
      <Grid.Row>
        <Grid.Col
          span={8}
          style={{ marginBottom: 12 }}
        >
          <Checkbox value="Option 1">Option 1</Checkbox>
        </Grid.Col>
        <Grid.Col
          span={8}
          style={{ marginBottom: 12 }}
        >
          <Checkbox disabled value="Option 2">
            Option 2
          </Checkbox>
        </Grid.Col>
        <Grid.Col
          span={8}
          style={{ marginBottom: 12 }}
        >
          <Checkbox value="Option 3">Option 3</Checkbox>
        </Grid.Col>
        <Grid.Col span={8}>
          <Checkbox value="Option 4">Option 4</Checkbox>
        </Grid.Col>
        <Grid.Col span={8}>
          <Checkbox value="Option 5">Option 5</Checkbox>
        </Grid.Col>
      </Grid.Row>
    </Checkbox.Group>
  );
}
