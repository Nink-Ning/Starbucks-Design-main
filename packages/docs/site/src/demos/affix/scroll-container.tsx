import React from 'react';
import { Affix, Button } from '@sbux/starbucks-design-react';

export default class Demo extends React.Component {
  container = null;

  render() {
    return (
      <div
        id="container"
        style={{ height: 200, overflow: 'auto' }}
        ref={(node) => { this.container = node }}
      >
        <div
          style={{
            height: 400,
            backgroundColor: 'var(--color-fill-2)',
            backgroundImage: `
            linear-gradient(45deg, var(--color-bg-2) 25%, transparent 0, transparent 75%, var(--color-bg-2) 0),
            linear-gradient(45deg, var(--color-bg-2) 25%, transparent 0, transparent 75%, var(--color-bg-2) 0)`,
            backgroundPosition: `0 0, 15px 15px`,
            backgroundSize: `30px 30px`,
            overflow: 'hidden',
          }}
        >
          <Affix
            ref={(ref) => (this.affixRef = ref)}
            target={() => this.container}
            offsetTop={20}
            style={{ margin: 40 }}
            targetContainer={() => window}
          >
            <Button type="primary">Affix in scrolling container</Button>
          </Affix>
        </div>
      </div>
    );
  }
}
