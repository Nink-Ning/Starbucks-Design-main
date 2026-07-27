<template>
  <Select
    :style="{ width: '320px' }"
    default-value="Beijing"
    placeholder="Please select ..."
    @dropdown-scroll="handleScroll"
    @dropdown-reach-bottom="handleReachBottom"
  >
    <Option>Beijing</Option>
    <Option>Shanghai</Option>
    <Option>Guangzhou</Option>
    <Option disabled>Disabled</Option>
    <Option>Shenzhen</Option>
    <Option>Chengdu</Option>
    <Option>Wuhan</Option>
  </Select>
</template>

<script setup lang="ts">
const handleScroll = (ev) => {
  console.log('scroll', ev);
};
const handleReachBottom = (ev) => {
  console.log('reach the bottom', ev);
};
</script>
