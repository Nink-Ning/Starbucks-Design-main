<template>
  <Space class="wrapper" direction="vertical">
    <Button type="primary" long>Primary</Button>
    <Button long>Default</Button>
    <Button type="dashed" long>Dashed</Button>
    <Button type="outline" long>Outline</Button>
    <Button type="text" long>Text</Button>
  </Space>
</template>

<style scoped lang="less">
.wrapper {
  width: 400px;
  padding: 20px;
  border: 1px solid var(~'--color-border');
  border-radius: 4px;
}
</style>