import { Grid, InputTag } from '@sbux/starbucks-design-react';
import { IconUser } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <div>
      <Grid cols={2} colGap={12} rowGap={12} style={{ maxWidth: 600 }}>
        <Grid.GridItem>
          <InputTag prefix="¥" allowClear />
        </Grid.GridItem>
        <Grid.GridItem>
          <InputTag addBefore={<IconUser />} allowClear />
        </Grid.GridItem>

        <Grid.GridItem>
          <InputTag prefix="¥" addBefore={<IconUser />} allowClear />
        </Grid.GridItem>

        <Grid.GridItem>
          <InputTag addBefore={'www.'} addAfter={'.com'} allowClear />
        </Grid.GridItem>
      </Grid>
    </div>
  );
}
