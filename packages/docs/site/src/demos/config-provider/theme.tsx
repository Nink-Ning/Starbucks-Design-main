import { useState } from 'react';
import { ConfigProvider, Radio, Button, Input } from '@sbux/starbucks-design-react';

export default function Demo() {
  const themes = {
    blue: {
      primaryColor: '#3370ff',
    },
    red: {
      primaryColor: '#ee4d38',
    },
    green: {
      primaryColor: '#0fbf60',
    },
    orange: {
      primaryColor: '#f58505',
    },
  };
  const [theme, setTheme] = useState(null);
  return (
    <ConfigProvider theme={theme && themes[theme]}>
      <Radio.Group
        name="theme"
        options={['blue', 'red', 'green', 'orange']}
        onChange={(theme) => {
          setTheme(theme);
        }}
        style={{ display: 'block', marginBottom: 40 }}
      />
      <Button
        style={{ marginRight: 40 }}
        type="primary"
      >
        Button
      </Button>
      <Input
        style={{ width: 200 }}
        placeholder="Please Enter ..."
      />
    </ConfigProvider>
  );
}
