<template>
  <Space size="large">
    <Dropdown @select="handleSelect">
      <Button>Click Me</Button>
      <template #content>
        <Doption>Option 1</Doption>
        <Doption disabled>Option 2</Doption>
        <Doption :value="{ value: 'Option3' }">Option 3</Doption>
      </template>
    </Dropdown>
    <Dropdown @select="handleSelect" disabled>
      <Button disabled>Click Me</Button>
      <template #content>
        <Doption>Option 1</Doption>
        <Doption disabled>Option 2</Doption>
        <Doption>Option 3</Doption>
      </template>
    </Dropdown>
    <Dropdown @select="handleSelect" :popup-max-height="false">
      <Button>No Max Height <icon-down /></Button>
      <template #content>
        <Doption>Option 1</Doption>
        <Doption disabled>Option 2</Doption>
        <Doption>Option 3</Doption>
        <Doption>Option 4</Doption>
        <Doption>Option 5</Doption>
        <Doption>Option 6</Doption>
        <Doption>Option 7</Doption>
        <Doption>Option 8</Doption>
        <Doption>Option 9</Doption>
      </template>
    </Dropdown>
  </Space>
</template>

<script setup lang="ts">
import { IconDown } from '@sbux/starbucks-design-vue/icon';

const handleSelect = (v) => {
  console.log(v);
};
</script>

<style>
.arco-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}
</style>
