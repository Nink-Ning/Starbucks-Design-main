<template>
  <Space>
    <Dropdown position="bl">
      <Button>Bottom Left</Button>
      <template #content>
        <Doption>Option 1</Doption>
        <Doption>Option 2</Doption>
        <Doption>Option 3</Doption>
      </template>
    </Dropdown>
    <Dropdown position="bottom">
      <Button>Bottom</Button>
      <template #content>
        <Doption>Option 1</Doption>
        <Doption>Option 2</Doption>
        <Doption>Option 3</Doption>
      </template>
    </Dropdown>
    <Dropdown position="br">
      <Button>Bottom Right</Button>
      <template #content>
        <Doption>Option 1</Doption>
        <Doption>Option 2</Doption>
        <Doption>Option 3</Doption>
      </template>
    </Dropdown>
    <Dropdown position="tl">
      <Button>Top Left</Button>
      <template #content>
        <Doption>Option 1</Doption>
        <Doption>Option 2</Doption>
        <Doption>Option 3</Doption>
      </template>
    </Dropdown>
    <Dropdown position="top">
      <Button>Top</Button>
      <template #content>
        <Doption>Option 1</Doption>
        <Doption>Option 2</Doption>
        <Doption>Option 3</Doption>
      </template>
    </Dropdown>
    <Dropdown position="tr">
      <Button>Top Right</Button>
      <template #content>
        <Doption>Option 1</Doption>
        <Doption>Option 2</Doption>
        <Doption>Option 3</Doption>
      </template>
    </Dropdown>
  </Space>
</template>