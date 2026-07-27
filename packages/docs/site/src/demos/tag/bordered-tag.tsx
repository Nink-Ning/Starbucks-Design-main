import { Space, Tag } from '@sbux/starbucks-design-react';

export default function Demo() {
  const COLORS = [
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
    'pinkpurple',
    'magenta',
    'gray',
  ];

  return (
    <Space wrap>
      <Tag bordered>Default</Tag>
      {COLORS.map((color, i) => (
        <Tag key={i} color={color} bordered>
          {color}
        </Tag>
      ))}
    </Space>
  );
}
