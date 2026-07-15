<template>
  <Space wrap>
    <Tag bordered>default</Tag>
    <Tag
      v-for="(color, index) of colors"
      :key="index"
      :color="color"
      bordered
      >{{ color }}</Tag
    >
  </Space>
</template>

<script setup lang="ts">
const colors = [
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'pinkpurple',
  'magenta',
  'gray',
];
</script>