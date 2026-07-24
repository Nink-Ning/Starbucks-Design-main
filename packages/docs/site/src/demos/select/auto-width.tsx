import { Divider, Select } from '@sbux/starbucks-design-react';

const dividerLabelStyle = {
  overflowWrap: 'normal',
  whiteSpace: 'nowrap',
  wordBreak: 'normal',
} as const;

export default function Demo() {
  const options = [
    'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
    'BBBBBBBBBBBBBBBBBBBB',
    'CCCCCCCCCCCC',
    'DDDD',
    'EEE',
    'FF',
  ];

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <Divider orientation="center">
          <code style={dividerLabelStyle}>
            {JSON.stringify({ minWidth: 200, maxWidth: 500 })}
          </code>
        </Divider>
        <Select
          autoWidth={{ minWidth: 200, maxWidth: 500 }}
          placeholder="Select an item"
          options={options}
          allowClear
          showSearch
        />
        <br />
        <br />
        <Select
          autoWidth={{ minWidth: 200, maxWidth: 500 }}
          placeholder="Select an item"
          options={options}
          allowClear
          showSearch
          addBefore="Select"
        />
      </div>

      <div style={{ marginBottom: 32 }}>
        <Divider orientation="center">
          <code style={dividerLabelStyle}>
            {JSON.stringify({ minWidth: 0, maxWidth: 500 })}
          </code>
        </Divider>
        <Select
          autoWidth={{ maxWidth: 500 }}
          placeholder="Select an item"
          options={options}
          allowClear
          showSearch
        />
        <br />
        <br />
        <Select
          autoWidth={{ maxWidth: 500 }}
          placeholder="Select an item"
          options={options}
          allowClear
          showSearch
          addBefore="Select"
        />
      </div>

      <div style={{ marginBottom: 32 }}>
        <Divider orientation="center">
          <code style={dividerLabelStyle}>
            {JSON.stringify({ minWidth: 300, maxWidth: '100%' })}
          </code>
        </Divider>
        <Select
          autoWidth={{ minWidth: 300 }}
          placeholder="Select an item"
          options={options}
          allowClear
          mode="multiple"
          allowCreate
        />
        <br />
        <br />
        <Select
          addBefore="Select"
          autoWidth={{ minWidth: 300 }}
          placeholder="Select an item"
          options={options}
          allowClear
          mode="multiple"
          allowCreate
        />
      </div>
    </div>
  );
}
