import { Switch, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space size="large" direction="vertical">
      <Space size="large">
        <Switch loading defaultChecked />
        <Switch loading />
        <Switch loading type="round" defaultChecked />
        <Switch loading type="round" />
      </Space>
      <Space size="large">
        <Switch loading size="small" defaultChecked />
        <Switch loading size="small" />
        <Switch loading size="small" type="round" defaultChecked />
        <Switch loading size="small" type="round" />
      </Space>
    </Space>
  );
}
