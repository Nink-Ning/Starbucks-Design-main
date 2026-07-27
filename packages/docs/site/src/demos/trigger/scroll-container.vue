<template>
  <div :style="{ height: '100px', overflowY: 'scroll' }">
    <div :style="{ height: '200px' }">
      <Trigger trigger="click" update-at-scroll>
        <Button :style="{ marginTop: '80px' }">Click Me</Button>
        <template #content>
          <div class="demo-basic">
            <Empty />
          </div>
        </template>
      </Trigger>
    </div>
  </div>
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