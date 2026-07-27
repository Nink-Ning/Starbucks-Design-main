import { Divider, Input } from '@sbux/starbucks-design-react';

const dividerLabelStyle = {
  overflowWrap: 'normal',
  whiteSpace: 'nowrap',
  wordBreak: 'normal',
} as const;

export default function Demo() {
  return (
    <div>
      <Divider>
        <code style={dividerLabelStyle}>
          {JSON.stringify({ minWidth: 0, maxWidth: 500 })}
        </code>
      </Divider>

      <Input placeholder="Enter something" autoWidth={{ maxWidth: 500 }} />

      <Divider>
        <code style={dividerLabelStyle}>
          {JSON.stringify({ minWidth: 300, maxWidth: 500 })}
        </code>
      </Divider>

      <Input autoWidth={{ minWidth: 300, maxWidth: 500 }} placeholder="Enter something" />
      <br />
      <br />
      <Input
        placeholder="Enter something"
        prefix="Prefix"
        autoWidth={{ minWidth: 300, maxWidth: 500 }}
      />
      <br />
      <br />
      <Input
        placeholder="Enter something"
        addBefore="Before"
        prefix="Prefix"
        autoWidth={{ minWidth: 300, maxWidth: 500 }}
      />
    </div>
  );
}
