<template>
  <Space size="large">
    <Dropdown>
      <Button>Click Me</Button>
      <template #content>
        <Doption>Option 1</Doption>
        <Doption>Option 2</Doption>
        <Doption>Option 3</Doption>
      </template>
    </Dropdown>
    <Dropdown trigger="hover">
      <Button>Hover Me</Button>
      <template #content>
        <Doption>Option 1</Doption>
        <Doption>Option 2</Doption>
        <Doption>Option 3</Doption>
      </template>
    </Dropdown>
  </Space>
</template>
