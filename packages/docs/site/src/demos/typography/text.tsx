import React from 'react';
import { Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  function Layout(props) {
    return React.Children.map(props.children, (child) => {
      return <div style={{ marginBottom: 10 }}>{child}</div>;
    });
  }

  return (
    <Layout>
      <Typography.Text>Arco Design</Typography.Text>
      <Typography.Text type="secondary">Secondary</Typography.Text>
      <Typography.Text type="primary">Primary</Typography.Text>
      <Typography.Text type="success">Success</Typography.Text>
      <Typography.Text type="warning">Warning</Typography.Text>
      <Typography.Text type="error">Error</Typography.Text>
      <Typography.Text bold>Bold</Typography.Text>
      <Typography.Text disabled>Disabled</Typography.Text>
      <Typography.Text mark>Mark</Typography.Text>
      <Typography.Text underline>Underline</Typography.Text>
      <Typography.Text delete>Line through</Typography.Text>
      <Typography.Text code>Code snippet</Typography.Text>
    </Layout>
  );
}
