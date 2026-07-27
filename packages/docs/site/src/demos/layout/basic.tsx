import { Layout } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div className="layout-basic-demo">
      <Layout style={{ height: '400px' }}>
        <Layout.Header>Header</Layout.Header>
        <Layout.Content>Content</Layout.Content>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
      <br />
      <Layout style={{ height: '400px' }}>
        <Layout.Header>Header</Layout.Header>
        <Layout>
          <Layout.Sider>Sider</Layout.Sider>
          <Layout.Content>Content</Layout.Content>
        </Layout>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
      <br />
      <Layout style={{ height: '400px' }}>
        <Layout.Header>Header</Layout.Header>
        <Layout>
          <Layout.Content>Content</Layout.Content>
          <Layout.Sider>Sider</Layout.Sider>
        </Layout>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
      <br />
      <Layout style={{ height: '400px' }}>
        <Layout.Header>Header</Layout.Header>
        <Layout>
          <Layout.Sider style={{ width: '64px' }}>Sider</Layout.Sider>
          <Layout.Sider style={{ width: '206px', marginLeft: '1px' }}>Sider</Layout.Sider>
          <Layout.Content>Content</Layout.Content>
        </Layout>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
    </div>
  );
}
