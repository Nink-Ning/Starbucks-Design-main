<template>
  <Space>
    <Popover title="Title">
      <Button>Hover Me</Button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </Popover>
    <Popover title="Title" trigger="click">
      <Button>Click Me</Button>
      <template #content>
        <p>Here is the text content</p>
        <p>Here is the text content</p>
      </template>
    </Popover>
  </Space>
</template>
