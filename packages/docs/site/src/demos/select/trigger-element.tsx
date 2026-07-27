import { useRef, useState } from 'react';
import { Link, Select, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const refSelect = useRef(null);
  const [text, setText] = useState('None');
  return (
    <div>
      <Select
        ref={refSelect}
        mode="multiple"
        onChange={(_, option) => {
          const array = option.map((item) => item.children);
          setText(array.join('，') || 'None');
        }}
        triggerElement={
          <Typography.Paragraph
            style={{
              width: 300,
            }}
            className="trigger-element"
            tabIndex={0}
            onKeyDown={(e) => {
              refSelect.current && refSelect.current.hotkeyHandler(e);
            }}
          >
            Favorite Cities：<Link>{text}</Link>
          </Typography.Paragraph>
        }
      >
        <Select.Option value="1">Beijing</Select.Option>
        <Select.Option disabled value="2">
          Shanghai
        </Select.Option>
        <Select.Option value="3">Shenzhen</Select.Option>
        <Select.Option value="4">Wuhan</Select.Option>
      </Select>
    </div>
  );
}
