<template>
  <div class="layout-demo">
    <Layout style="height: 400px;">
      <LayoutHeader>Header</LayoutHeader>
      <LayoutContent>Content</LayoutContent>
      <LayoutFooter>Footer</LayoutFooter>
    </Layout>
    <br />
    <Layout style="height: 400px;">
      <LayoutHeader>Header</LayoutHeader>
      <Layout>
        <LayoutSider theme="dark">Sider</LayoutSider>
        <LayoutContent>Content</LayoutContent>
      </Layout>
      <LayoutFooter>Footer</LayoutFooter>
    </Layout>
    <br />
    <Layout style="height: 400px;">
      <LayoutHeader>Header</LayoutHeader>
      <Layout>
        <LayoutContent>Content</LayoutContent>
        <LayoutSider>Sider</LayoutSider>
      </Layout>
      <LayoutFooter>Footer</LayoutFooter>
    </Layout>
    <br />
    <Layout style="height: 400px;">
      <LayoutHeader>Header</LayoutHeader>
      <Layout>
        <LayoutSider style="width: 64px;">Sider</LayoutSider>
        <LayoutSider style="width: 206px; margin-left: 1px;"
          >Sider</LayoutSider
        >
        <LayoutContent>Content</LayoutContent>
      </Layout>
      <LayoutFooter>Footer</LayoutFooter>
    </Layout>
  </div>
</template>
<style scoped>
.layout-demo :deep(.arco-layout-header),
.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-sider-children),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}

.layout-demo :deep(.arco-layout-header),
.layout-demo :deep(.arco-layout-footer) {
  height: 64px;
  background-color: var(--color-primary-light-4);
}

.layout-demo :deep(.arco-layout-sider) {
  width: 206px;
  background-color: var(--color-primary-light-3);
}

.layout-demo :deep(.arco-layout-content) {
  background-color: rgb(var(--arcoblue-6));
}
</style>