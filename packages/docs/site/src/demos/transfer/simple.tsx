import { useState, useMemo } from 'react';
import { Transfer, Switch, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [retainSelectedItems, setRetainSelectedItems] = useState(false);

  const dataSource = useMemo(() => {
    return new Array(8).fill(null).map((_, index) => ({
      key: `${index + 1}`,
      value: `Option ${index + 1}`,
    }));
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Switch
          style={{ marginRight: 8 }}
          size="small"
          checked={retainSelectedItems}
          onChange={setRetainSelectedItems}
        />
        <Typography.Text code>
          {`simple = { retainSelectedItems: ${retainSelectedItems} }`}
        </Typography.Text>
      </div>
      <Transfer
        simple={{ retainSelectedItems }}
        dataSource={dataSource}
        defaultTargetKeys={['1', '2', '3']}
        titleTexts={['To-do list', 'Selected list']}
      />
    </div>
  );
}
