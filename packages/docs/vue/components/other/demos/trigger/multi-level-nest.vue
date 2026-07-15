<template>
  <Trigger trigger="click">
    <Button>Click Me</Button>
    <template #content>
      <div class="trigger-demo-nest">
        <Empty />
        <Trigger position="right">
          <Button>Hover Me</Button>
          <template #content>
            <div class="trigger-demo-nest">
              <Empty />
              <Trigger trigger="click" position="right">
                <Button>Click Me</Button>
                <template #content>
                  <div class="trigger-demo-nest">
                    <Empty />
                    <Trigger position="right">
                      <Button>Hover Me</Button>
                      <template #content>
                        <Empty class="trigger-demo-nest" />
                      </template>
                    </Trigger>
                  </div>
                </template>
              </Trigger>
            </div>
          </template>
        </Trigger>
      </div>
    </template>
  </Trigger>
</template>

<style scoped>
.trigger-demo-nest {
  padding: 10px;
  width: 200px;
  background-color: var(--color-bg-popup);
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.trigger-demo-nest-popup-content {
  text-align: right;
}
</style>