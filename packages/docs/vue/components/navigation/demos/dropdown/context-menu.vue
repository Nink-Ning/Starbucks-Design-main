<template>
  <Dropdown trigger="contextMenu" alignPoint :style="{ display: 'block' }">
    <div
      :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '300px',
        backgroundColor: 'var(--color-fill-2)',
      }"
    >
      <div>Click Me</div>
    </div>
    <template #content>
      <Doption>Option 1</Doption>
      <Doption>Option 2</Doption>
      <Doption>Option 3</Doption>
    </template>
  </Dropdown>
</template>