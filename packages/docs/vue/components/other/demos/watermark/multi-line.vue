<template>
  <Watermark :content="['arco.design', dayjs().format('YYYY-MM-DD')]">
    <div style="width: 100%; height: 300px;" />
  </Watermark>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
</script>