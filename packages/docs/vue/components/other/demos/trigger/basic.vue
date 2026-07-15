<template>
  <Space>
    <Trigger position="top" auto-fit-position :unmount-on-close="false">
      <span>Hover Me</span>
      <template #content>
        <div class="demo-basic">
          <Empty />
        </div>
      </template>
    </Trigger>
    <Trigger trigger="click" :unmount-on-close="false">
      <Button>Click Me</Button>
      <template #content>
        <div class="demo-basic">
          <Empty />
        </div>
      </template>
    </Trigger>
    <Trigger trigger="focus">
      <Input placeholder="Focus on me" />
      <template #content>
        <div class="demo-basic">
          <Empty />
        </div>
      </template>
    </Trigger>
  </Space>
</template>

<style scoped>
.demo-basic {
  padding: 10px;
  width: 200px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}
</style>