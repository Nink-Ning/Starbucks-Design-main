import { Select, Tag } from '@sbux/starbucks-design-react';

export default function Demo() {
  const options = [
    'red',
    'orangered',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'arcoblue',
    'purple',
    'magenta',
  ];

  function tagRender(props) {
    const { label, value, closable, onClose } = props;
    return (
      <Tag
        color={options.indexOf(value) > -1 ? value : 'gray'}
        closable={closable}
        onClose={onClose}
      >
        {label}
      </Tag>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Select
          style={{ maxWidth: 350, marginRight: 20 }}
          allowClear
          placeholder="Select color"
          mode={'multiple'}
          defaultValue={options.slice(0, 2)}
          options={options}
          renderTag={tagRender}
        />
      </div>
    </div>
  );
}
