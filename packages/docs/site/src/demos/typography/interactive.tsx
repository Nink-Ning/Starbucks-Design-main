import { useState } from 'react';
import { Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [str, setStr] = useState('Click the icon to edit this text.');
  return (
    <Typography>
      <Typography.Paragraph copyable>Click the icon to copy this text.</Typography.Paragraph>
      <Typography.Paragraph
        editable={{
          onChange: setStr
        }}
      >
        {str}
      </Typography.Paragraph>
      {[...new Array(6)].map((_, index) => {
        return (
          <Typography.Title editable heading={index + 1} style={{ margin: 0 }}>
            H{index + 1}. The Pragmatic Romanticism
          </Typography.Title>
        );
      })}
    </Typography>
  );
}
