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
      <Typography.Text>Starbucks Design</Typography.Text>
      <Typography.Text type="secondary">辅助说明</Typography.Text>
      <Typography.Text type="primary">主要信息</Typography.Text>
      <Typography.Text type="success">已完成</Typography.Text>
      <Typography.Text type="warning">待确认</Typography.Text>
      <Typography.Text type="error">需处理</Typography.Text>
      <Typography.Text bold>重点内容</Typography.Text>
      <Typography.Text disabled>不可操作</Typography.Text>
      <Typography.Text mark>品牌标记</Typography.Text>
      <Typography.Text underline>可点击文本</Typography.Text>
      <Typography.Text delete>已废弃内容</Typography.Text>
      <Typography.Text code>design-token</Typography.Text>
    </Layout>
  );
}
