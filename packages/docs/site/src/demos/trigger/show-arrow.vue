<template>
  <Space>
    <Trigger trigger="click">
      <Button>Click Me</Button>
      <template #content>
        <div class="demo-arrow">
          <Empty />
        </div>
      </template>
    </Trigger>
    <Trigger trigger="click" show-arrow>
      <Button>Click Me (Arrow)</Button>
      <template #content>
        <div class="demo-arrow">
          <Empty />
        </div>
      </template>
    </Trigger>
  </Space>
</template>

<style scoped>
.demo-arrow {
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
  padding: 10px;
  width: 200px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
}
</style>