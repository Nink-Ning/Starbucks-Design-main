<template>
  <Trigger trigger="click" align-point>
    <div class="demo-point-trigger">
      <div>Click Me</div>
    </div>
    <template #content>
      <div class="demo-point">
        <Empty />
      </div>
    </template>
  </Trigger>
</template>

<style scoped>
.demo-point-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  background-color: var(--color-fill-2);
}

.demo-point {
  padding: 10px;
  width: 200px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.demo-point-wrapper {
  display: block;
}
</style>