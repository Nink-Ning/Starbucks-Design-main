<template>
  <Space direction="vertical">
    <Rate color="red" />
    <Rate :color="color" />
  </Space>
</template>

<script setup lang="ts">
const color = {
  2: 'red',
  4: 'green',
  5: 'blue',
};
</script>
