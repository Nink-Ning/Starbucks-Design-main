import { Layout } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div className="sb-layout-demo sb-layout-demo--stack">
      <Layout className="sb-layout-demo__frame">
        <Layout.Header>Header</Layout.Header>
        <Layout.Content>Content</Layout.Content>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
      <Layout className="sb-layout-demo__frame">
        <Layout.Header>Header</Layout.Header>
        <Layout>
          <Layout.Sider>Sider</Layout.Sider>
          <Layout.Content>Content</Layout.Content>
        </Layout>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
      <Layout className="sb-layout-demo__frame">
        <Layout.Header>Header</Layout.Header>
        <Layout>
          <Layout.Content>Content</Layout.Content>
          <Layout.Sider>Sider</Layout.Sider>
        </Layout>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
      <Layout className="sb-layout-demo__frame">
        <Layout.Header>Header</Layout.Header>
        <Layout>
          <Layout.Sider className="sb-layout-demo__sider--narrow">Sider</Layout.Sider>
          <Layout.Sider className="sb-layout-demo__sider--wide">Sider</Layout.Sider>
          <Layout.Content>Content</Layout.Content>
        </Layout>
        <Layout.Footer>Footer</Layout.Footer>
      </Layout>
    </div>
  );
}
