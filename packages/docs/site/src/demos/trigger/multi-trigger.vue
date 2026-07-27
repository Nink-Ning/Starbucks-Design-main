<template>
  <Trigger :trigger="['click', 'hover', 'focus']">
    <Input placeholder="Click/Hover/Focus on me" />
    <template #content>
      <div class="demo-trigger">
        <Empty />
      </div>
    </template>
  </Trigger>
</template>

<style scoped>
.demo-trigger {
  padding: 10px;
  width: 200px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}
</style>