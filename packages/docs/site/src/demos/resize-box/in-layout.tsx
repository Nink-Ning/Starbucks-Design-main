import { Layout } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div className="layout-basic-demo">
      <Layout>
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
