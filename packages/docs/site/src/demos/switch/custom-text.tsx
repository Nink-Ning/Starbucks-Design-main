import { Switch, Space } from '@sbux/starbucks-design-react';
import { IconCheck, IconClose } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space size="large">
      <Switch checkedText="ON" uncheckedText="OFF" />
      <Switch checkedText="1" uncheckedText="0" type="round" defaultChecked />
      <Switch checkedText={<IconCheck />} uncheckedText={<IconClose />} defaultChecked />
    </Space>
  );
}
