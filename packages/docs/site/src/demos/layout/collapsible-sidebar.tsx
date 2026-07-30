import { Layout } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div className="sb-layout-demo sb-layout-demo--stack">
      <Layout className="sb-layout-demo__frame sb-layout-demo__frame--compact">
        <Layout.Header>Header</Layout.Header>
        <Layout>
          <Layout.Sider
            resizeDirections={['right']}
            style={{
              minWidth: 150,
              maxWidth: 500,
              height: 200,
            }}
          >
            Sider
          </Layout.Sider>
          <Layout.Content>Content</Layout.Content>
        </Layout>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
    </div>
  );
}
