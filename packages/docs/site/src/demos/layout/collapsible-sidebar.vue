<template>
  <div class="sb-layout-demo sb-layout-demo--stack">
    <Layout class="sb-layout-demo__frame sb-layout-demo__frame--compact">
      <LayoutHeader>Header</LayoutHeader>
      <Layout>
        <LayoutSider
          :resize-directions="['right']"
          :style="{ minWidth: '150px', maxWidth: '500px', height: '200px' }"
        >
          Sider
        </LayoutSider>
        <LayoutContent>Content</LayoutContent>
      </Layout>
      <LayoutFooter>Footer</LayoutFooter>
    </Layout>
  </div>
</template>
