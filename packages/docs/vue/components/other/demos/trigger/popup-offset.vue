<template>
  <Space>
    <Trigger>
      <Button>BOTTOM</Button>
      <template #content>
        <div class="trigger-demo-translate">
          <Empty />
        </div>
      </template>
    </Trigger>
    <Trigger :popup-translate="[100, 20]">
      <Button>BOTTOM OFFSET[100, 20]</Button>
      <template #content>
        <div class="trigger-demo-translate">
          <Empty />
        </div>
      </template>
    </Trigger>
    <Trigger :popup-translate="[-100, 20]">
      <Button>BOTTOM OFFSET[-100, 20]</Button>
      <template #content>
        <div class="trigger-demo-translate">
          <Empty />
        </div>
      </template>
    </Trigger>
  </Space>
</template>

<style scoped>
.trigger-demo-translate {
  padding: 10px;
  width: 200px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}
</style>