import { Switch, Space } from '@sbux/starbucks-design-react';
import { IconCheck, IconClose } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Space size="large">
      <Switch checkedIcon={<IconCheck />} uncheckedIcon={<IconClose />} defaultChecked />
      <Switch
        type="round"
        checkedIcon={<IconCheck />}
        uncheckedIcon={<IconClose />}
        defaultChecked
      />
    </Space>
  );
}
