<template>
  <div style="width: 100%; overflow: auto">
    <Calendar :default-value="defaultValue" header-type="select" />
  </div>
</template>

<script setup lang="ts">
const defaultValue = new Date('2020-04-01');
</script>
