<template>
  <Button type="primary" @click="handleClick">Open Drawer</Button>
</template>

<script setup lang="ts">


const handleClick = () => {
  Drawer.open({
    title: 'Info Title',
    content: 'This is an info message',
    width: 340,
  });
};
</script>