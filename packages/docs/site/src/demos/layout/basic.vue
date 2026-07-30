<template>
  <div class="sb-layout-demo sb-layout-demo--stack">
    <Layout class="sb-layout-demo__frame">
      <LayoutHeader>Header</LayoutHeader>
      <LayoutContent>Content</LayoutContent>
      <LayoutFooter>Footer</LayoutFooter>
    </Layout>
    <Layout class="sb-layout-demo__frame">
      <LayoutHeader>Header</LayoutHeader>
      <Layout>
        <LayoutSider>Sider</LayoutSider>
        <LayoutContent>Content</LayoutContent>
      </Layout>
      <LayoutFooter>Footer</LayoutFooter>
    </Layout>
    <Layout class="sb-layout-demo__frame">
      <LayoutHeader>Header</LayoutHeader>
      <Layout>
        <LayoutContent>Content</LayoutContent>
        <LayoutSider>Sider</LayoutSider>
      </Layout>
      <LayoutFooter>Footer</LayoutFooter>
    </Layout>
    <Layout class="sb-layout-demo__frame">
      <LayoutHeader>Header</LayoutHeader>
      <Layout>
        <LayoutSider class="sb-layout-demo__sider--narrow">Sider</LayoutSider>
        <LayoutSider class="sb-layout-demo__sider--wide">Sider</LayoutSider>
        <LayoutContent>Content</LayoutContent>
      </Layout>
      <LayoutFooter>Footer</LayoutFooter>
    </Layout>
  </div>
</template>
