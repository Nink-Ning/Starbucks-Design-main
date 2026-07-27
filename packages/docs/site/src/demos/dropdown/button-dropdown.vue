<template>
  <Space size="large">
    <DropdownButton>
      Publish
      <template #content>
        <Doption>Save now</Doption>
        <Doption>Save and Publish</Doption>
      </template>
    </DropdownButton>
    <DropdownButton disabled>
      Disabled
      <template #content>
        <Doption>Save now</Doption>
        <Doption>Save and Publish</Doption>
      </template>
    </DropdownButton>
    <DropdownButton>
      Publish
      <template #icon>
        <icon-down />
      </template>
      <template #content>
        <Doption>Save now</Doption>
        <Doption>Save and Publish</Doption>
      </template>
    </DropdownButton>
  </Space>
</template>

<script setup lang="ts">
import { IconDown } from '@sbux/starbucks-design-vue/icon';
</script>

<style>
.arco-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}
</style>
